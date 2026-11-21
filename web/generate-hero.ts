// Maintainer task (not part of Vercel build). Requires Python 3 + Pillow with animated WebP.
import { execFileSync } from "node:child_process";
import {
  readFileSync,
  writeFileSync,
  mkdtempSync,
  mkdirSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { heroFrame } from "./hero-frames";

const web = fileURLToPath(new URL(".", import.meta.url));
const manifest = JSON.parse(
  readFileSync(join(web, "examples/manifest.json"), "utf8"),
) as { entries: { code: string; file: string; widthMm: number }[] };
const output = join(web, "public/hero");
mkdirSync(output, { recursive: true });
const dir = mkdtempSync(join(tmpdir(), "kice-hero-"));
const frames = 25;
const requested = process.argv.slice(2);
if (requested.some((id) => !/^REP-0[1-9]$/.test(id)))
  throw Error("Expected REP-01 … REP-09");
try {
  for (const { code, file, widthMm } of manifest.entries.filter(
    (e) =>
      /^REP-0[1-9]$/.test(e.code) &&
      (!requested.length || requested.includes(e.code)),
  )) {
    const original = readFileSync(join(web, "examples", file + ".dsl"), "utf8");
    for (let i = 0; i < frames; i++) {
      const u = (1 - Math.cos((Math.PI * i) / (frames - 1))) / 2;
      writeFileSync(join(dir, "frame.dsl"), heroFrame(code, original, u));
      execFileSync(
        process.execPath,
        [
          join(web, "../skills/kicedraw/bin/kicedraw.mjs"),
          "svg",
          join(dir, "frame.dsl"),
          join(dir, "frame.svg"),
          "--width-mm",
          String(widthMm),
        ],
        { env: { ...process.env, KICEDRAW_NO_UPDATE: "1" }, timeout: 45000 },
      );
      const svg = readFileSync(join(dir, "frame.svg"), "utf8");
      const fills = original.match(/:\s*FillRegion\(/g)?.length ?? 0;
      if (
        /NaN|Infinity/.test(svg) ||
        (svg.match(/fill-rule="evenodd"/g)?.length ?? 0) < fills
      )
        throw Error(`Invalid geometry: ${code} frame ${i}`);
      writeFileSync(
        join(dir, `${i}.png`),
        new Resvg(svg, { fitTo: { mode: "width", value: 800 } })
          .render()
          .asPng(),
      );
    }
    execFileSync("python3", [
      "-c",
      `from PIL import Image
import sys,os
frames=[Image.open(os.path.join(sys.argv[1],str(i)+'.png')).convert('RGB') for i in range(int(sys.argv[3]))]
frames+=frames[-2:0:-1]
frames[0].save(sys.argv[2],format='WEBP',save_all=True,append_images=frames[1:],duration=100,loop=0,lossless=True,method=4)`,
      dir,
      join(output, code + ".webp"),
      String(frames),
    ]);
    console.log(`${code}: ${2 * frames - 2} frames`);
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}
