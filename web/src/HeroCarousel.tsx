import { useEffect, useRef, useState } from "react";

const codes = Array.from({ length: 9 }, (_, i) => `REP-0${i + 1}`);
const slides = [codes[codes.length - 1], ...codes, codes[0]];
const wrap = (slot: number) => ((slot - 1 + codes.length) % codes.length) + 1;

export function HeroCarousel({
  entries,
}: {
  entries: { code: string; title: string }[];
}) {
  // The two extra panels let both seam crossings travel exactly one panel.
  const [slot, setSlot] = useState(1);
  const [snap, setSnap] = useState(false);
  const [drag, setDrag] = useState(0);
  const [holding, setHolding] = useState(false);
  const [reduce, setReduce] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const start = useRef<{ id: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduce(media.matches);
      setSlot(wrap);
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  function move(step: number) {
    setSnap(false);
    setSlot((s) =>
      s < 1 || s > codes.length ? s : reduce ? wrap(s + step) : s + step,
    );
  }
  useEffect(() => {
    if (holding || reduce) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) move(1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slot, holding, reduce]);
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
    >
      <div
        className="slide-window"
        onPointerDown={(e) => {
          if (!e.isPrimary || e.button !== 0 || slot !== wrap(slot)) return;
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
            transform: `translateX(calc(-${slot * 100}% + ${drag}px))`,
            transition: holding || snap || reduce ? "none" : undefined,
          }}
          onTransitionEnd={(e) => {
            if (
              e.target === e.currentTarget &&
              e.propertyName === "transform" &&
              slot !== wrap(slot)
            ) {
              setSnap(true);
              setSlot(wrap(slot));
            }
          }}
        >
          {slides.map((code, i) => (
            <img
              key={i}
              className="plate-drawing object-contain"
              draggable={false}
              aria-hidden={i !== slot}
              src={`/drawings/${code}.svg`}
              alt={entries.find((e) => e.code === code)?.title ?? code}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
