import { useEffect, useRef, useState } from "react";
import type { Reply, Request } from "./engine-types";

export function usePreview(
  source: string | null,
  width: number,
  allowUpmath: boolean,
) {
  const worker = useRef<Worker | null>(null);
  const [result, setResult] = useState<{
    reply: Reply;
    request: Request;
  } | null>(null);
  useEffect(() => () => worker.current?.terminate(), []);
  useEffect(() => {
    if (source === null) return;
    const request = { source, width, allowUpmath };
    let running = false;
    let timeout: number;
    const stop = () => {
      worker.current?.terminate();
      worker.current = null;
    };
    const debounce = window.setTimeout(() => {
      try {
        const current = (worker.current ??= new Worker(
          new URL("./render.worker.ts", import.meta.url),
          { type: "module" },
        ));
        running = true;
        const finish = (reply: Reply) => {
          if (!running) return;
          running = false;
          clearTimeout(timeout);
          current.onmessage = current.onerror = null;
          setResult({ reply, request });
        };
        current.onmessage = ({ data }: MessageEvent<Reply>) => finish(data);
        current.onerror = () => {
          finish({
            error:
              "렌더링 엔진을 불러오지 못했습니다. 새로고침 후 다시 시도하세요.",
          });
          stop();
        };
        timeout = window.setTimeout(
          () => {
            finish({
              error:
                "계산 시간이 초과됐습니다. 도면이나 수식을 줄여 다시 시도하세요.",
            });
            stop();
          },
          allowUpmath ? 22000 : 6000,
        );
        current.postMessage(request);
      } catch {
        running = false;
        stop();
        setResult({
          reply: { error: "이 브라우저에서 미리보기를 시작하지 못했습니다." },
          request,
        });
      }
    }, 300);
    return () => {
      clearTimeout(debounce);
      clearTimeout(timeout);
      if (running) {
        running = false;
        stop();
      }
    };
  }, [source, width, allowUpmath]);

  if (
    result?.request.source !== source ||
    result.request.width !== width ||
    result.request.allowUpmath !== allowUpmath
  )
    return null;
  return result.reply;
}
