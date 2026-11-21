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
import { heroFrame, heroRange } from "./hero-frames";

const web = fileURLToPath(new URL(".", import.meta.url));
const cli = join(web, "../skills/kicedraw/bin/kicedraw.mjs");
const manifest = JSON.parse(
  readFileSync(join(web, "examples/manifest.json"), "utf8"),
) as {
  entries: { code: string; file: string; widthMm: number }[];
};
const output = join(web, "public/hero");
mkdirSync(output, { recursive: true });
const dir = mkdtempSync(join(tmpdir(), "kice-hero-"));
/** Sampled frames: both ends, plus quarters, for label review. */
const frames = 37;
const duration = 70;
const requested = process.argv.slice(2);
if (requested.some((id) => !/^REP-0[1-9]$/.test(id)))
  throw Error("Expected REP-01 … REP-09");
const run = (args: string[]) =>
  execFileSync(process.execPath, [cli, ...args], {
    env: { ...process.env, KICEDRAW_NO_UPDATE: "1" },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 45000,
  });
const uOf = (i: number) => (1 - Math.cos((Math.PI * i) / (frames - 1))) / 2;

try {
  for (const { code, file, widthMm } of manifest.entries.filter(
    (e) =>
      /^REP-0[1-9]$/.test(e.code) &&
      (!requested.length || requested.includes(e.code)),
  )) {
    const original = readFileSync(join(web, "examples", file + ".dsl"), "utf8");
    const fills = original.match(/:\s*FillRegion\(/g)?.length ?? 0;
    const notes = new Set<string>();
    for (let i = 0; i < frames; i++) {
      const dsl = heroFrame(code, original, uOf(i));
      writeFileSync(join(dir, "frame.dsl"), dsl);
      if (i % 9 === 0 || i === frames - 1) {
        // Label and layout review at the widest points of travel.
        const report = run([
          "check",
          join(dir, "frame.dsl"),
          "--width-mm",
          String(widthMm),
        ]);
        for (const line of report.split("\n"))
          if (/SNG-W\d+/.test(line)) notes.add(`${i}: ${line.trim()}`);
      }
      run([
        "svg",
        join(dir, "frame.dsl"),
        join(dir, "frame.svg"),
        "--width-mm",
        String(widthMm),
      ]);
      const svg = readFileSync(join(dir, "frame.svg"), "utf8");
      if (
        /NaN|Infinity/.test(svg) ||
        (svg.match(/fill-rule="evenodd"/g)?.length ?? 0) < fills
      )
        throw Error(`Invalid geometry: ${code} frame ${i}`);
      writeFileSync(
        join(dir, `${i}.png`),
        new Resvg(svg, { fitTo: { mode: "width", value: 760 } })
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
frames[0].save(sys.argv[2],format='WEBP',save_all=True,append_images=frames[1:],duration=int(sys.argv[4]),loop=0,lossless=True,method=4)`,
      dir,
      join(output, code + ".webp"),
      String(frames),
      String(duration),
    ]);
    const range = heroRange(code)!;
    console.log(
      `${code} [${range[0]} … ${range[1]}]: ${2 * frames - 2} frames, ${notes.size} layout notes`,
    );
    for (const note of notes) console.log("   " + note);
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}
