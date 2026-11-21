import { useEffect, useRef, useState } from "react";

const codes = Array.from({ length: 9 }, (_, i) => `REP-0${i + 1}`);

export function HeroCarousel({
  entries,
}: {
  entries: { code: string; title: string }[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [drag, setDrag] = useState(0);
  const [holding, setHolding] = useState(false);
  const [hover, setHover] = useState(false);
  const start = useRef<{ id: number; x: number; y: number } | null>(null);
  const move = (step: number) =>
    setIndex((i) => (i + step + codes.length) % codes.length);
  useEffect(() => {
    if (paused || holding || hover) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) move(1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, holding, hover, index]);
  function reset() {
    start.current = null;
    setHolding(false);
    setDrag(0);
  }
  return (
    <div
      className="plate carousel"
      role="region"
      aria-label="재현 도면 슬라이드"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="slide-window"
        tabIndex={0}
        aria-label="좌우 방향키 또는 드래그로 도면 넘기기"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            move(e.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        onPointerDown={(e) => {
          if (!e.isPrimary || e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          start.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
          setHolding(true);
        }}
        onPointerMove={(e) => {
          const p = start.current;
          if (p?.id === e.pointerId)
            setDrag(Math.max(-80, Math.min(80, e.clientX - p.x)));
        }}
        onPointerUp={(e) => {
          const p = start.current;
          if (!p || p.id !== e.pointerId) return;
          const dx = e.clientX - p.x,
            dy = e.clientY - p.y;
          if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy))
            move(dx < 0 ? 1 : -1);
          reset();
        }}
        onPointerCancel={reset}
        onLostPointerCapture={reset}
      >
        <div
          className="slide-track"
          style={{
            transform: `translateX(calc(-${index * 100}% + ${drag}px))`,
            transition: holding ? "none" : undefined,
          }}
        >
          {codes.map((code, i) => (
            <img
              key={code}
              className="plate-drawing object-contain"
              draggable={false}
              aria-hidden={i !== index}
              src={`/drawings/${code}.svg`}
              alt={entries.find((e) => e.code === code)?.title ?? code}
            />
          ))}
        </div>
      </div>
      <div className="slide-controls">
        <span aria-live={paused ? "polite" : "off"}>{codes[index]} / 09</span>
        <button type="button" onClick={() => move(-1)} aria-label="이전 도면">
          ←
        </button>
        <button
          type="button"
          aria-label={paused ? "자동 재생 시작" : "자동 재생 정지"}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? "재생" : "정지"}
        </button>
        <button type="button" onClick={() => move(1)} aria-label="다음 도면">
          →
        </button>
      </div>
    </div>
  );
}
