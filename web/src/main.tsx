import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "../style.css";

const DslEditor = lazy(() => import("./DslEditor"));

const repo = "https://github.com/jiwonMe/kicedraw-skills";
const install = "npx skills add jiwonMe/kicedraw-skills --skill kicedraw -g";
interface Drawing {
  code: string;
  title: string;
  summary: string;
  widthMm: number;
}
const asset = (id: string, ext: "svg" | "dsl") => `/drawings/${id}.${ext}`;
function Copy({ value, label = "복사" }: { value: string; label?: string }) {
  const [status, set] = useState("");
  useEffect(() => {
    set("");
  }, [value]);
  useEffect(() => {
    if (status) {
      const t = setTimeout(() => set(""), 1800);
      return () => clearTimeout(t);
    }
  }, [status]);
  return (
    <button
      disabled={!value}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          set("복사 완료");
        } catch {
          set("직접 선택해 주세요");
        }
      }}
      aria-live="polite"
    >
      {status || label}
    </button>
  );
}
function Detail({ item, close }: { item: Drawing; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null),
    [source, set] = useState(""),
    [error, fail] = useState(false);
  useEffect(() => {
    ref.current?.showModal();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  useEffect(() => {
    const c = new AbortController();
    fetch(asset(item.code, "dsl"), { signal: c.signal })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.text();
      })
      .then(set)
      .catch(() => {
        if (!c.signal.aborted) fail(true);
      });
    return () => c.abort();
  }, [item.code]);
  return (
    <dialog
      ref={ref}
      aria-labelledby="detail-title"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            close();
        }
      }}
    >
      <div className="dialoghead">
        <div>
          <small>
            {item.code} · 인쇄 폭 {item.widthMm}mm
          </small>
          <h2 id="detail-title">{item.title}</h2>
        </div>
        <button onClick={close} autoFocus>
          닫기 ×
        </button>
      </div>
      <p className="my-4">{item.summary}</p>
      <div className="panels">
        <figure>
          <img src={asset(item.code, "svg")} alt={item.title} />
        </figure>
        <div className="source">
          <div className="source-toolbar">
            <span>DSL 원문 · {item.code}.dsl</span>
            <Copy value={source} label="코드 복사" />
          </div>
          {source ? (
            <Suspense fallback={<p role="status">편집기를 불러오는 중…</p>}>
              <DslEditor source={source} name={item.code} />
            </Suspense>
          ) : (
            <p role="status">
              {error
                ? "원문을 불러올 수 없습니다. 아래 DSL 다운로드를 이용하세요."
                : "불러오는 중…"}
            </p>
          )}
        </div>
      </div>
      <div className="dialogfoot">
        <a href={asset(item.code, "svg")} download>
          SVG 다운로드 ↓
        </a>
        <a href={asset(item.code, "dsl")} download>
          DSL 다운로드 ↓
        </a>
      </div>
    </dialog>
  );
}
function App() {
  const [entries, load] = useState<Drawing[]>([]),
    [failed, fail] = useState(false),
    [query, search] = useState(""),
    [hash, navigate] = useState(location.hash.slice(1));
  useEffect(() => {
    fetch("/drawings/gallery.json")
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then(load)
      .catch(() => fail(true));
    const update = () => navigate(location.hash.slice(1));
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const selected = entries.find((e) => e.code === hash),
    visible = entries.filter(
      (e) =>
        `${e.title} ${e.summary} ${e.code}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
    );
  const close = () => {
    history.replaceState(
      null,
      "",
      location.pathname + location.search + "#gallery",
    );
    navigate("gallery");
  };
  return (
    <>
      <a className="skip" href="#gallery">
        갤러리 바로가기
      </a>
      <header>
        <a className="brand" href="/">
          <img src="/favicon.svg" alt="" width="32" height="32" />
          KICEDraw
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#gallery">도면 갤러리</a>
          <a href="#install">설치 안내</a>
          <a href={repo}>GitHub ↗</a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="intro">
            <h1>
              수능 수학을 위한 <br />
              관계기반 일러스트
            </h1>
            <p>터미널에서 KICEDraw 스킬을 설치하세요.</p>
            <div className="terminal mt-3">
              <code>{install}</code>
              <Copy value={install} />
            </div>
            <a className="cta" href="#gallery">
              도면 살펴보기 <span>↓</span>
            </a>
          </div>
          <figure className="plate">
            <img
              className="plate-drawing object-contain"
              src={asset("REP-02", "svg")}
              alt="삼각형의 수선과 원호, 교점 E를 경계로 나뉜 두 음영 영역"
            />
          </figure>
        </section>
        <section id="gallery">
          <div className="sectionhead">
            <div>
              <h2>도면 갤러리</h2>
              {entries.length > 0 && <p>따라 그린 도면 {entries.length}종</p>}
            </div>
            <label className="search">
              검색{" "}
              <input
                type="search"
                value={query}
                onChange={(e) => search(e.target.value)}
                placeholder="도면 이름 또는 코드"
              />
            </label>
          </div>
          <div
            id="count"
            role="status"
            className={
              entries.length > 0 && !failed && visible.length === entries.length
                ? "sr-only"
                : undefined
            }
          >
            {failed
              ? "갤러리를 불러오지 못했습니다. 새로고침해 주세요."
              : !entries.length
                ? "도면을 불러오는 중…"
                : visible.length
                  ? `검색 결과 ${visible.length}종`
                  : "검색 결과가 없습니다. 다른 검색어를 입력해 주세요."}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
            {visible.map((e) => (
              <a
                className="card"
                key={e.code}
                href={"#" + e.code}
                aria-label={`${e.title} — 도면과 DSL 보기`}
              >
                <img loading="lazy" src={asset(e.code, "svg")} alt="" />
                <small className="plate-id">
                  {e.code} · {e.widthMm} mm
                </small>
                <strong>{e.title}</strong>
              </a>
            ))}
          </div>
        </section>
        <section id="install">
          <h2>에이전트에 설치하기</h2>
          <p className="my-4">
            터미널에 아래 명령을 입력한 뒤 사용할 에이전트를 선택하세요. 스킬
            실행은 Node.js 22 기준입니다.
          </p>
          <div className="terminal">
            <code>{install}</code>
            <Copy value={install} />
          </div>
          <p className="mt-4">
            <a href={repo + "#readme"}>에이전트별 사용 안내 ↗</a>
          </p>
        </section>
      </main>
      <footer>
        <b>KICEDraw</b>
        <span>수능 수학 도면 자료실</span>
        <a href="#">맨 위로 ↑</a>
      </footer>
      {selected && <Detail key={selected.code} item={selected} close={close} />}
    </>
  );
}
const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
