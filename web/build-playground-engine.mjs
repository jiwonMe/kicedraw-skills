// Maintainer task: bundle ClassGeo from a prepared source checkout, never at deploy time.
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const web = fileURLToPath(new URL(".", import.meta.url));
if (!process.argv[2])
  throw Error("Usage: npm run playground:engine -- /path/to/euclidraw");
const root = resolve(process.argv[2]);
const { build } = createRequire(join(root, "package.json"))("esbuild");
const target = join(web, "public/playground-engine");
await mkdir(target, { recursive: true });
const { metafile } = await build({
  absWorkingDir: root,
  stdin: {
    contents: `export { checkSuneungDsl, checkSuneungDslAsync } from './packages/exporter/src/lint/index.ts';
export { exportSvgFromString, exportSvgFromStringAsync } from './packages/exporter/src/svg-only.ts';
export { MissingFormula } from './packages/shared/src/upmath.ts';`,
    resolveDir: root,
  },
  alias: {
    "@classgeo/dsl/validator": "./packages/dsl/src/validator.ts",
    ...Object.fromEntries(
      [
        "shared",
        "core",
        "constraint-solver",
        "dsl",
        "fill",
        "path-segmentation",
        "renderer-svg",
      ].map((pkg) => [`@classgeo/${pkg}`, `./packages/${pkg}/src/index.ts`]),
    ),
  },
  bundle: true,
  metafile: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  minify: true,
  charset: "utf8",
  legalComments: "eof",
  outfile: join(target, "classgeo.mjs"),
});
const licenseFiles = /^(license|licence|copying|notice)(\.|$)/i;
const directories = new Set(
  Object.keys(metafile.inputs).flatMap((p) => {
    const match = /.*node_modules\/(?:@[^/]+\/)?[^/]+(?=\/)/.exec(p);
    return match ? [match[0]] : [];
  }),
);
const git = (...args) =>
  execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
const hash = git("rev-parse", "HEAD");
const dirty =
  git("status", "--porcelain", "--", "packages", "pnpm-lock.yaml") !== "";
const notes = [
  await readFile(join(web, "../skills/kicedraw/LICENSE"), "utf8"),
  `ClassGeo source base: ${hash}${dirty ? " (with local source changes)" : ""}`,
];
for (const dir of [...directories].sort()) {
  const path = resolve(root, dir);
  const { name, version } = JSON.parse(
    await readFile(join(path, "package.json"), "utf8"),
  );
  const files = (await readdir(path))
    .filter((name) => licenseFiles.test(name))
    .sort();
  if (!files.length) {
    if (name !== "saxes" || version !== "6.0.0")
      throw Error(`Missing license: ${name}`);
    notes.push(
      `saxes 6.0.0\n${await readFile(join(root, "scripts/licenses/saxes-6.0.0.txt"), "utf8")}`,
    );
  }
  for (const file of files)
    notes.push(
      `${name} ${version} — ${file}\n${await readFile(join(path, file), "utf8")}`,
    );
}
await writeFile(join(target, "NOTICE.txt"), notes.join("\n\n"));
