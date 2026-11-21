import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "../style.css";

const repo = "https://github.com/jiwonMe/kicedraw-skills";
const install = "npx skills add jiwonMe/kicedraw-skills --skill kicedraw -g";
interface Drawing {
  code: string;
  title: string;
  summary: string;
  widthMm: number;
}
const families: Readonly<Record<string, string>> = {
  REP: "따라 그린 도면",
  CAL: "미적분",
  EXP: "지수·로그",
  TRI: "삼각형·삼각함수",
  SEQ: "수열",
  CON: "이차곡선",
  VEC: "벡터",
  SPC: "공간도형",
};
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
          <div>
            <span>DSL 원문</span>
            <Copy value={source} label="코드 복사" />
          </div>
          <pre tabIndex={0}>
            <code>
              {source ||
                (error
                  ? "원문을 불러올 수 없습니다. 아래 DSL 다운로드를 이용하세요."
                  : "불러오는 중…")}
            </code>
          </pre>
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
    [family, filter] = useState("전체"),
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
        (family === "전체" || e.code.startsWith(family)) &&
        `${e.title} ${e.summary} ${e.code} ${families[e.code.slice(0, 3)]}`
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
            <span className="eyebrow">
              <i />
              수능 수학 작도 스킬
            </span>
            <h1>
              좌표 대신
              <br />
              <em>관계</em>를 그립니다.
            </h1>
            <p>
              두 점을 잇고, 교점을 구하고, 닫힌 면을 채웁니다.
              <br />
              기하 관계를 DSL로 적으면 인쇄용 도면이 됩니다.
            </p>
            <a className="cta" href="#gallery">
              도면 살펴보기 <span>↓</span>
            </a>
          </div>
          <figure className="plate">
            <div className="platemeta">
              <span>작도 표본</span>
              <span>TRI–06</span>
            </div>
            <img
              src={asset("TRI-06", "svg")}
              alt="같은 삼각형의 세 변에 접하는 내접원과 세 꼭짓점을 지나는 외접원"
            />
            <figcaption>
              <strong>삼각형의 내접원과 외접원</strong>
              <a href="#TRI-06">DSL 보기 ↗</a>
            </figcaption>
          </figure>
        </section>
        <section id="gallery">
          <div className="sectionline">
            01 <span>/</span> 자료실
          </div>
          <div className="sectionhead">
            <div>
              <h2>도면 갤러리</h2>
              <p>도면을 선택하면 작도에 쓰인 DSL 원문을 볼 수 있습니다.</p>
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
            id="filters"
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="분야 선택"
          >
            {["전체", ...Object.keys(families)].map((f) => (
              <button
                key={f}
                aria-pressed={family === f}
                onClick={() => filter(f)}
              >
                {families[f] || f}
              </button>
            ))}
          </div>
          <div id="count" role="status">
            {failed
              ? "갤러리를 불러오지 못했습니다. 새로고침해 주세요."
              : !entries.length
                ? "도면을 불러오는 중…"
                : visible.length
                  ? `도면 ${visible.length}종`
                  : "검색 결과가 없습니다. 다른 검색어나 분야를 선택해 주세요."}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
            {visible.map((e) => (
              <a className="card" key={e.code} href={"#" + e.code}>
                <small>
                  {e.code} · {families[e.code.slice(0, 3)]}
                </small>
                <img loading="lazy" src={asset(e.code, "svg")} alt="" />
                <strong>{e.title}</strong>
                <span>인쇄 폭 {e.widthMm}mm · DSL 보기 ↗</span>
              </a>
            ))}
          </div>
        </section>
        <section id="install">
          <div className="sectionline">
            02 <span>/</span> 시작하기
          </div>
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
