import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  checkSuneungDsl,
  exportSvgFromString,
  MissingFormula,
} from "./public/playground-engine/classgeo.mjs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
for (const [id, outputWidthMm] of Object.entries({
  median: 90,
  piecewise: 85,
  scalars: 65,
  section: 95,
})) {
  test(`${id} matches the CLI's reference SVG`, () => {
    const source = read(`./docs/examples/${id}.dsl`);
    const report = checkSuneungDsl(source, { outputWidthMm });
    assert.deepEqual(report.errors, []);
    const result = exportSvgFromString(source, {
      printPreset: "suneung",
      outputWidthMm,
    });
    assert.equal(result.svg, read(`./docs/examples/${id}.svg`));
  });
}

test("invalid DSL produces line diagnostics", () => {
  const report = checkSuneungDsl('@version: "1.1.0"\nP: NotAConstructor()');
  assert.equal(report.ok, false);
  assert.equal(report.errors[0].line, 2);
});

test("offline entry signals an uncached formula without calling fetch", () => {
  const source = read("./docs/examples/piecewise.dsl").replace(
    "$y=f(x)$",
    "$k_{973}$",
  );
  const original = globalThis.fetch;
  globalThis.fetch = () => {
    throw Error("offline entry must not use fetch");
  };
  try {
    assert.throws(
      () => checkSuneungDsl(source, { outputWidthMm: 85 }),
      MissingFormula,
    );
  } finally {
    globalThis.fetch = original;
  }
});
