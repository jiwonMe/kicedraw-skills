import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
const here = fileURLToPath(new URL(".", import.meta.url)),
  dest = join(here, "public/drawings"),
  src = join(here, "../skills/kicedraw/references/catalogue");
interface CatalogueEntry {
  code: string;
  title: string;
  summary: string;
  widthMm: number;
  sha256: Record<"svg" | "dsl", string>;
}
const { entries }: { entries: CatalogueEntry[] } = JSON.parse(
  await readFile(join(src, "manifest.json"), "utf8"),
);
await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });
for (const e of entries) {
  if (!/^[A-Z]{3}-\d\d$/.test(e.code)) throw Error("Invalid drawing code");
  for (const ext of ["svg", "dsl"] as const) {
    const name = e.code + "." + ext,
      bytes = await readFile(join(src, name));
    if (createHash("sha256").update(bytes).digest("hex") !== e.sha256[ext])
      throw Error("Invalid asset: " + name);
    await writeFile(join(dest, name), bytes);
  }
}
await writeFile(
  join(dest, "gallery.json"),
  JSON.stringify(
    entries.map(({ code, title, summary, widthMm }) => ({
      code,
      title,
      summary,
      widthMm,
    })),
  ),
);
console.log(`도면 ${entries.length}종과 DSL을 검증했습니다.`);
