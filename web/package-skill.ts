import { readFile, writeFile, mkdir, readdir, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { zipSync, type Zippable } from "fflate";

// Only inventory-listed files from the public release can enter this endpoint.
export async function packageSkill(skill: string, dest: string) {
  const metadata = await readFile(join(skill, "version.json"));
  const info: { name: string; version: string; files: Record<string, string> } =
    JSON.parse(metadata.toString());
  if (
    info.name !== "kicedraw" ||
    !/^\d+\.\d+\.\d+$/.test(info.version) ||
    !info.files["SKILL.md"] ||
    !info.files["bin/kicedraw.mjs"]
  )
    throw Error("Invalid skill release");
  const files: Zippable = {};
  const sha = (b: Uint8Array) => createHash("sha256").update(b).digest("hex");
  for (const name of Object.keys(info.files).sort()) {
    if (!name.split("/").every((p) => /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(p)))
      throw Error(`Invalid release path: ${name}`);
    const b = await readFile(join(skill, name));
    if (sha(b) !== info.files[name])
      throw Error(`Release digest mismatch: ${name}`);
    files[`kicedraw/${name}`] = b;
  }
  files["kicedraw/version.json"] = metadata;
  const zip = zipSync(files, { level: 6, mtime: new Date(2000, 0, 1) });
  await mkdir(dest, { recursive: true });
  for (const f of await readdir(dest))
    if (
      /^kicedraw-\d+\.\d+\.\d+\.zip$/.test(f) &&
      f !== `kicedraw-${info.version}.zip`
    )
      await rm(join(dest, f));
  await writeFile(join(dest, `kicedraw-${info.version}.zip`), zip);
  await writeFile(
    join(dest, "latest.json"),
    JSON.stringify({
      name: info.name,
      version: info.version,
      sha256: sha(zip),
    }) + "\n",
  );
}
