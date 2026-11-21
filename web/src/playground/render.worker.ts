import type { Reply, Report, Request } from "./engine-types";

interface Engine {
  checkSuneungDsl(source: string, options: { outputWidthMm: number }): Report;
  checkSuneungDslAsync(
    source: string,
    options: { outputWidthMm: number },
  ): Promise<Report>;
  exportSvgFromString(source: string, options: ExportOptions): { svg: string };
  exportSvgFromStringAsync(
    source: string,
    options: ExportOptions,
  ): Promise<{ svg: string }>;
  MissingFormula: typeof Error;
}
interface ExportOptions {
  printPreset: "suneung";
  outputWidthMm: number;
}
const url = "/playground-engine/classgeo.mjs";
let engine: Promise<Engine> | undefined;

async function render({ source, width, allowUpmath }: Request): Promise<Reply> {
  if (!source.trim()) return { error: "DSL을 입력하세요." };
  if (source.length > 60000)
    return { error: "플레이그라운드에서는 코드를 60,000자 이하로 입력하세요." };
  if (!Number.isFinite(width) || width < 30 || width > 200)
    return { error: "인쇄 폭은 30~200mm로 입력하세요." };
  const api = await (engine ??= import(/* @vite-ignore */ url));
  const options = { outputWidthMm: width, printPreset: "suneung" } as const;
  try {
    const report = allowUpmath
      ? await api.checkSuneungDslAsync(source, options)
      : api.checkSuneungDsl(source, options);
    if (!report.ok) return { report };
    const { svg } = allowUpmath
      ? await api.exportSvgFromStringAsync(source, options)
      : api.exportSvgFromString(source, options);
    return { report, svg };
  } catch (error) {
    if (error instanceof api.MissingFormula)
      return {
        error:
          '내장되지 않은 수식입니다. Upmath 연결을 허용하거나 오프라인용 @mathRenderer: "mathjax"를 명시하세요.',
      };
    throw error;
  }
}
self.onmessage = async ({ data }: MessageEvent<Request>) => {
  try {
    self.postMessage(await render(data));
  } catch (error) {
    self.postMessage({
      error:
        error instanceof Error ? error.message : "도면을 그리지 못했습니다.",
    } satisfies Reply);
  }
};
