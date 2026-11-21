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
  const [playingSlot, setPlayingSlot] = useState(1);
  const [snap, setSnap] = useState(false);
  const [drag, setDrag] = useState(0);
  const [holding, setHolding] = useState(false);
  const [reduce, setReduce] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const plate = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [failed, setFailed] = useState<ReadonlySet<string>>(new Set());
  const start = useRef<{ id: number; x: number; y: number } | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting),
    );
    if (plate.current) observer.observe(plate.current);
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduce(media.matches);
      setSlot(wrap);
      setPlayingSlot(wrap(slot));
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [slot]);
  function move(step: number) {
    setSnap(false);
    setSlot((s) =>
      s < 1 || s > codes.length ? s : reduce ? wrap(s + step) : s + step,
    );
  }
  useEffect(() => {
    if (holding || reduce || !onScreen || !pageVisible) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) move(1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slot, holding, reduce, onScreen, pageVisible]);
  function reset() {
    start.current = null;
    setHolding(false);
    setDrag(0);
  }
  return (
    <div
      ref={plate}
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
              !holding
            ) {
              const target = wrap(slot);
              setPlayingSlot(target);
              if (target !== slot) {
                setSnap(true);
                setSlot(target);
              }
            }
          }}
        >
          {slides.map((code, i) => (
            <div
              key={i}
              className="hero-slide plate-drawing"
              aria-hidden={i !== slot}
            >
              <img
                src={
                  reduce ? `/drawings/${code}.svg` : `/hero/${code}.poster.png`
                }
                alt={entries.find((e) => e.code === code)?.title ?? code}
                draggable={false}
              />
              {i === playingSlot &&
                onScreen &&
                pageVisible &&
                !reduce &&
                !failed.has(code) && (
                  <img
                    src={`/hero/${code}.webp`}
                    alt=""
                    draggable={false}
                    style={{ visibility: "hidden" }}
                    onLoad={(e) => {
                      e.currentTarget.style.visibility = "visible";
                    }}
                    onError={() =>
                      setFailed((prev) => new Set([...prev, code]))
                    }
                  />
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
