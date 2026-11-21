import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const here = fileURLToPath(new URL(".", import.meta.url));
const dest = join(here, "public/drawings");
const refs = join(here, "../skills/kicedraw/references");
interface Drawing {
  code: string;
  title: string;
  summary: string;
  widthMm: number;
  sha256: Record<"svg" | "dsl", string>;
}
interface Example extends Drawing {
  file: string;
  collection: "examples" | "reproductions";
}
async function manifest<T>(dir: string): Promise<T[]> {
  return JSON.parse(await readFile(join(dir, "manifest.json"), "utf8")).entries;
}
const examplesDir = join(here, "examples");
const examples = await manifest<Example>(examplesDir);
await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });
const seen = new Set<string>();
async function publish(e: Drawing, dir: string, basename: string) {
  if (!/^REP-\d\d$/.test(e.code) || seen.has(e.code) || !/^[\w-]+$/.test(basename))
    throw Error(`잘못된 도면 코드 또는 파일명: ${e.code}`);
  seen.add(e.code);
  for (const ext of ["svg", "dsl"] as const) {
    const bytes = await readFile(join(dir, `${basename}.${ext}`));
    if (createHash("sha256").update(bytes).digest("hex") !== e.sha256[ext])
      throw Error(`도면 무결성 검사 실패: ${basename}.${ext}`);
    await writeFile(join(dest, `${e.code}.${ext}`), bytes);
  }
}
for (const e of examples)
  await publish(e, e.collection === "examples" ? examplesDir : join(refs, "reproductions"), e.file);
await writeFile(join(dest, "gallery.json"), JSON.stringify(examples.map(({code,title,summary,widthMm})=>({code,title,summary,widthMm}))));
console.log(`재현 도면 ${examples.length}종의 SVG·DSL을 검증했습니다.`);
