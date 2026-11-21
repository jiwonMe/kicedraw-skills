import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { examples } from "../../docs-config";
import starter from "../../docs/examples/median.dsl?raw";
import { Editor } from "./Editor";
import type { Reply } from "./engine-types";
import { usePreview } from "./use-preview";
import "../../style.css";
import "./playground.css";

const names: Record<string, string> = {
  median: "삼각형의 중선",
  piecewise: "조각함수와 끝점",
  scalars: "수치 풀이와 음영",
  section: "구와 평면의 단면",
};
const initialId =
  new URL(location.href).searchParams.get("example") ?? "median";
const lastExample =
  examples.find((example) => example.id === initialId) ?? examples[0];
const svgBlob = (svg: string) =>
  new Blob([svg], { type: "image/svg+xml;charset=utf-8" });

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Preview({
  result,
  loading,
}: {
  result: Reply | null;
  loading: boolean;
}) {
  const svg = result && "svg" in result ? result.svg : undefined;
  const report = result && "report" in result ? result.report : undefined;
  const error = result && "error" in result ? result.error : undefined;
  const [image, setImage] = useState<{ svg: string; url: string }>();
  useEffect(() => {
    if (!svg) return;
    const url = URL.createObjectURL(svgBlob(svg));
    setImage({ svg, url });
    return () => URL.revokeObjectURL(url);
  }, [svg]);
  const current = !loading && image?.svg === svg ? image?.url : undefined;
  return (
    <section className="pg-panel" aria-labelledby="pg-preview-title">
      <div className="pg-panel-bar">
        <h2 id="pg-preview-title">도면 미리보기</h2>
        <button
          type="button"
          disabled={!svg || loading}
          onClick={() => svg && download(svgBlob(svg), "figure.svg")}
        >
          SVG 다운로드 ↓
        </button>
      </div>
      <div className="pg-preview" aria-busy={loading || result === null}>
        {current ? (
          <img src={current} alt="현재 DSL로 작도한 수학 도면" />
        ) : (
          <p>
            {loading || !result || svg
              ? "도면을 그리는 중…"
              : "DSL을 수정하면 도면이 다시 표시됩니다."}
          </p>
        )}
      </div>
      <div className="pg-diagnostics" aria-live="polite">
        {error && !loading && <p className="pg-error">{error}</p>}
        {report && !loading && (
          <>
            <p>
              검증 결과 · 오류 {report.errors.length}개 · 경고{" "}
              {report.warnings.length}개
            </p>
            {[report.errors, report.warnings].map(
              (issues, i) =>
                issues.length > 0 && (
                  <ul className={i === 0 ? "pg-error" : "pg-warning"} key={i}>
                    {issues.map(({ code, line, objectId, message }, j) => (
                      <li key={j}>
                        <strong>
                          {code} · {line}행{objectId ? ` · ${objectId}` : ""}
                        </strong>{" "}
                        {message}
                      </li>
                    ))}
                  </ul>
                ),
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Playground() {
  const [example, setExample] = useState(lastExample);
  const [source, setSource] = useState(starter);
  const [editor, setEditor] = useState({ initial: starter, key: 0 });
  const [width, setWidth] = useState(String(lastExample.width));
  const [loading, setLoading] = useState(lastExample.id !== "median");
  const [loadError, setLoadError] = useState("");
  const [allowUpmath, setAllowUpmath] = useState(false);
  const pending = useRef<AbortController | null>(null);
  const result = usePreview(
    loading ? null : source,
    Number(width),
    allowUpmath,
  );

  async function openExample(id: string) {
    const next = examples.find((item) => item.id === id);
    if (!next) return;
    pending.current?.abort();
    const controller = new AbortController();
    pending.current = controller;
    setLoading(true);
    setLoadError("");
    try {
      const value =
        next.id === "median"
          ? starter
          : await fetch(`/docs-assets/${next.id}.dsl`, {
              signal: controller.signal,
            }).then((res) => {
              if (!res.ok) throw Error();
              return res.text();
            });
      if (controller.signal.aborted) return;
      setExample(next);
      setSource(value);
      setEditor(({ key }) => ({ initial: value, key: key + 1 }));
      setWidth(String(next.width));
      const url = new URL(location.href);
      url.searchParams.set("example", id);
      history.replaceState(null, "", url);
    } catch {
      if (!controller.signal.aborted)
        setLoadError("예제를 불러오지 못했습니다. 기존 코드는 유지했습니다.");
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }
  useEffect(() => {
    if (lastExample.id !== "median") void openExample(lastExample.id);
    return () => pending.current?.abort();
  }, []);

  function choose(id: string) {
    if (
      source !== editor.initial &&
      !window.confirm("편집 중인 코드를 예제 원문으로 바꿀까요?")
    )
      return;
    void openExample(id);
  }

  return (
    <>
      <a className="skip" href="#workspace">
        편집기 바로가기
      </a>
      <header>
        <a className="brand" href="/">
          <img src="/favicon.svg" alt="" width="32" height="32" />
          KICEDraw
        </a>
        <nav aria-label="주요 메뉴">
          <a href="/docs/">문서</a>
          <a href="/playground/" aria-current="page">
            플레이그라운드
          </a>
          <a href="/#gallery">갤러리</a>
        </nav>
      </header>
      <main id="workspace" className="pg-main" tabIndex={-1}>
        <div className="pg-intro">
          <p className="pg-kicker">ClassGeo DSL</p>
          <h1>DSL 플레이그라운드</h1>
          <p>
            코드를 바꾸면 도면과 검증 결과가 갱신됩니다. 도면이 마음에 들면
            DSL과 SVG를 내려받으세요.
          </p>
        </div>
        <div className="pg-tools">
          <label>
            예제{" "}
            <select
              value={example.id}
              disabled={loading}
              onChange={(event) => choose(event.target.value)}
            >
              {examples.map(({ id }) => (
                <option key={id} value={id}>
                  {names[id]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            disabled={loading || source === editor.initial}
            onClick={() => choose(example.id)}
          >
            예제 원문으로
          </button>
          <label className="pg-width">
            인쇄 폭{" "}
            <input
              type="number"
              value={width}
              min="30"
              max="200"
              onChange={(event) => setWidth(event.target.value)}
            />{" "}
            mm
          </label>
        </div>
        {loadError && (
          <p role="alert" className="pg-error">
            {loadError}
          </p>
        )}
        <div className="pg-layout">
          <section className="pg-panel" aria-labelledby="pg-editor-title">
            <div className="pg-panel-bar">
              <h2 id="pg-editor-title">DSL 편집기</h2>
              <button
                type="button"
                disabled={loading || !source.trim()}
                onClick={() =>
                  download(
                    new Blob([source], { type: "text/plain;charset=utf-8" }),
                    "figure.dsl",
                  )
                }
              >
                DSL 다운로드 ↓
              </button>
            </div>
            {loading && (
              <p className="pg-load" role="status">
                예제를 불러오는 중…
              </p>
            )}
            <div hidden={loading}>
              <Editor
                key={editor.key}
                initial={editor.initial}
                onChange={setSource}
              />
            </div>
          </section>
          <Preview result={result} loading={loading} />
        </div>
        <div className="pg-notes">
          <label>
            <input
              type="checkbox"
              checked={allowUpmath}
              onChange={(event) => setAllowUpmath(event.target.checked)}
            />{" "}
            내장되지 않은 수식은 Upmath로 렌더링하기
          </label>
          <p>
            도면은 브라우저에서 계산합니다. 이 옵션을 켜면 내장되지 않은 LaTeX
            수식만 Upmath로 보냅니다. 편집 내용은 자동 저장되지 않습니다.
          </p>
          <a href="/docs/quickstart/">첫 도면 만들기 →</a> <span>·</span>{" "}
          <a href="/docs/syntax/">DSL 문법 →</a>
        </div>
      </main>
      <footer>
        <b>KICEDraw</b>
        <a href="/playground-engine/NOTICE.txt">엔진 고지 ↗</a>
        <a href="#">맨 위로 ↑</a>
      </footer>
    </>
  );
}

const root = document.getElementById("root");
if (root) createRoot(root).render(<Playground />);
