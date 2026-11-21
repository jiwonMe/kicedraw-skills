import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import MarkdownIt from "markdown-it";
import { docsGroups, docsPages, docsUrl, examples } from "./docs-config";

const web = fileURLToPath(new URL(".", import.meta.url));
const docs = join(web, "docs");
const cli = join(web, "../skills/kicedraw/bin/kicedraw.mjs");
const assets = join(web, "public/docs-assets");
const hashPath = join(docs, "examples/sha256.json");
const regenerate = process.argv.includes("--examples");
const digest = (bytes: Buffer) =>
  createHash("sha256").update(bytes).digest("hex");
const manifest: Record<string, { dsl: string; svg: string }> = regenerate
  ? {}
  : JSON.parse(await readFile(hashPath, "utf8"));

await mkdir(assets, { recursive: true });
const sources = new Map<string, string>();
for (const { id, width } of examples) {
  const dsl = join(docs, "examples", `${id}.dsl`);
  const svg = join(docs, "examples", `${id}.svg`);
  if (regenerate) {
    for (const args of [
      ["check", dsl],
      ["svg", dsl, svg],
    ]) {
      execFileSync(
        process.execPath,
        [cli, ...args, "--width-mm", String(width)],
        {
          env: { ...process.env, KICEDRAW_NO_UPDATE: "1" },
          stdio: "inherit",
          timeout: 45000,
        },
      );
    }
  }
  const source = await readFile(dsl);
  const hashes = { dsl: digest(source), svg: digest(await readFile(svg)) };
  if (regenerate) manifest[id] = hashes;
  if (manifest[id]?.dsl !== hashes.dsl || manifest[id]?.svg !== hashes.svg) {
    throw Error(
      `실습 ${id}의 DSL·SVG가 일치하지 않습니다. npm run docs:examples --prefix web`,
    );
  }
  sources.set(id, source.toString("utf8"));
  await copyFile(dsl, join(assets, `${id}.dsl`));
  await copyFile(svg, join(assets, `${id}.svg`));
}
if (regenerate)
  await writeFile(hashPath, JSON.stringify(manifest, null, 2) + "\n");
await copyFile(
  join(web, "../skills/kicedraw/references/dsl-cheatsheet.md"),
  join(assets, "dsl-cheatsheet.md"),
);

const md = new MarkdownIt({ html: false });
const esc = md.utils.escapeHtml;
const originalFence = md.renderer.rules.fence!;
const codeBlock = (code: string, language: string) => `<div class="docs-code">
  <div class="docs-code-bar"><span>${esc(language)}</span><button hidden type="button" data-copy>복사</button></div>
  <pre tabindex="0"><code>${esc(code)}</code></pre></div>`;
md.renderer.rules.fence = (tokens, i, options, env, renderer) => {
  const token = tokens[i];
  const [kind, id] = token.info.trim().split(/\s+/);
  if (kind === "example") {
    const example = examples.find((e) => e.id === id);
    const source = sources.get(id);
    if (!example || !source) throw Error(`등록되지 않은 실습: ${id}`);
    return `<figure class="docs-example"><img src="/docs-assets/${id}.svg" alt="${esc(example.alt)}" loading="lazy"><figcaption>출력 예시 · ${example.width}mm</figcaption></figure>
    ${codeBlock(source, `${id}.dsl`)}
    <p class="docs-downloads"><a href="/docs-assets/${id}.dsl" download>DSL 다운로드 ↓</a> <a href="/docs-assets/${id}.svg" download>SVG 다운로드 ↓</a></p>`;
  }
  return kind === "sh" || kind === "text"
    ? codeBlock(token.content, kind === "sh" ? "터미널" : "DSL")
    : originalFence(tokens, i, options, env, renderer);
};
const repo = "https://github.com/jiwonMe/kicedraw-skills";
const knownPaths = new Set(docsPages.map((p) => docsUrl(p.slug)));
const fragments = new Map<string, Set<string>>();
const links: { from: string; path: string; fragment: string }[] = [];
for (const [i, page] of docsPages.entries()) {
  const url = docsUrl(page.slug);
  const source = await readFile(join(docs, "pages", `${page.file}.md`), "utf8");
  const env = {};
  const tokens = md.parse(source, env);
  const toc: { id: string; title: string }[] = [];
  for (const [j, token] of tokens.entries()) {
    if (token.type === "heading_open" && token.tag === "h2") {
      const id = `section-${toc.length + 1}`;
      token.attrSet("id", id);
      toc.push({ id, title: tokens[j + 1].content });
    }
    for (const child of token.children ?? []) {
      const href = child.type === "link_open" ? child.attrGet("href") : null;
      if (typeof href === "string" && href.startsWith("/docs/")) {
        const [path, fragment = ""] = href.split("#");
        links.push({ from: url, path, fragment });
      }
    }
  }
  fragments.set(url, new Set(toc.map(({ id }) => id)));
  const content = md.renderer.render(tokens, md.options, env);
  const menus = docsGroups
    .map(
      (group) =>
        `<div class="docs-nav-group"><strong>${group.title}</strong><ul>${group.pages.map((p) => `<li><a href="${docsUrl(p.slug)}"${p.slug === page.slug ? ' aria-current="page"' : ""}>${p.title}</a></li>`).join("")}</ul></div>`,
    )
    .join("");
  const pagination = (index: number, direction: string) => {
    const p = docsPages[index];
    return p
      ? `<a href="${docsUrl(p.slug)}"><small>${direction}</small><span>${p.title}</span></a>`
      : "<span></span>";
  };
  const title = page.slug
    ? `${page.title} · KICEDraw 문서`
    : "ClassGeo DSL 문서 · KICEDraw";
  const dir = join(docs, page.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(
    join(dir, "index.html"),
    `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="https://kicedraw.com${url}"><link rel="icon" href="/favicon.svg">
<script type="module" src="/src/docs/main.ts"></script>
</head>
<body class="docs">
<a class="skip" href="#content">본문 바로가기</a>
<header class="docs-header"><a class="brand" href="/"><img src="/favicon.svg" alt="" width="32" height="32">KICEDraw</a>
<nav aria-label="주요 메뉴"><a href="/docs/" aria-current="true">문서</a><a href="/#gallery">갤러리</a><a href="${repo}">GitHub ↗</a></nav></header>
<main class="docs-layout">
<aside class="docs-sidebar"><details class="docs-mobile-menu"><summary>문서 메뉴</summary><nav aria-label="문서 메뉴">${menus}</nav></details><nav class="docs-desktop-menu" aria-label="문서 메뉴">${menus}</nav></aside>
<article id="content" tabindex="-1" class="docs-article"><p class="docs-kicker">ClassGeo DSL / ${page.group}</p><h1>${page.slug ? esc(page.title) : "ClassGeo DSL 문서"}</h1>
<details class="docs-mobile-toc"><summary>이 페이지의 목차</summary><ul>${toc.map((h) => `<li><a href="#${h.id}">${esc(h.title)}</a></li>`).join("")}</ul></details>
${content}
<nav class="docs-pagination" aria-label="이전 및 다음 문서">${pagination(i - 1, "← 이전")}${pagination(i + 1, "다음 →")}</nav></article>
<aside class="docs-toc"><nav aria-label="이 페이지의 목차"><strong>이 페이지에서</strong><ul>${toc.map((h) => `<li><a href="#${h.id}">${esc(h.title)}</a></li>`).join("")}</ul></nav><a href="${repo}/blob/main/web/docs/pages/${page.file}.md">GitHub에서 원문 보기 ↗</a></aside>
</main>
<footer><b>KICEDraw</b><a href="/docs-assets/dsl-cheatsheet.md" download>DSL 치트시트 ↓</a><a href="#">맨 위로 ↑</a></footer>
</body></html>\n`,
  );
}
for (const { from, path, fragment } of links) {
  if (
    !knownPaths.has(path) ||
    (fragment && !fragments.get(path)?.has(fragment))
  ) {
    throw Error(`문서 링크가 유효하지 않습니다: ${from} → ${path}#${fragment}`);
  }
}
console.log(
  `문서 ${docsPages.length}페이지와 실습 ${examples.length}개를 준비했습니다.`,
);
