// Build-time variations only. Each frame is a new DSL construction, not an image transform.
type P = { x: number; y: number };
const centre = (...ps: P[]): P => ({
  x: ps.reduce((s, p) => s + p.x, 0) / ps.length,
  y: ps.reduce((s, p) => s + p.y, 0) / ps.length,
});
const polar = (r: number, deg: number): P => ({
  x: r * Math.cos((deg * Math.PI) / 180),
  y: r * Math.sin((deg * Math.PI) / 180),
});
const line = (a: P, b: P, c: P, d: P): P => {
  const r = { x: b.x - a.x, y: b.y - a.y },
    s = { x: d.x - c.x, y: d.y - c.y },
    den = r.x * s.y - r.y * s.x;
  const t = ((c.x - a.x) * s.y - (c.y - a.y) * s.x) / den;
  return { x: a.x + t * r.x, y: a.y + t * r.y };
};
const rotate = (p: P, o: P, deg: number): P => {
  const a = (deg * Math.PI) / 180,
    dx = p.x - o.x,
    dy = p.y - o.y;
  return {
    x: o.x + dx * Math.cos(a) - dy * Math.sin(a),
    y: o.y + dx * Math.sin(a) + dy * Math.cos(a),
  };
};
/** Incenter: the point furthest from all three edges of a thin triangle. */
const incenter = (a: P, b: P, c: P): P => {
  const wa = Math.hypot(b.x - c.x, b.y - c.y),
    wb = Math.hypot(c.x - a.x, c.y - a.y),
    wc = Math.hypot(a.x - b.x, a.y - b.y);
  const w = wa + wb + wc;
  return {
    x: (wa * a.x + wb * b.x + wc * c.x) / w,
    y: (wa * a.y + wb * b.y + wc * c.y) / w,
  };
};

/** Shoelace centroid of a simple polygon. */
const polygonCentre = (ps: P[]): P => {
  let a = 0,
    x = 0,
    y = 0;
  for (let i = 0; i < ps.length; i++) {
    const p = ps[i],
      q = ps[(i + 1) % ps.length],
      f = p.x * q.y - q.x * p.y;
    a += f;
    x += (p.x + q.x) * f;
    y += (p.y + q.y) * f;
  }
  return { x: x / (3 * a), y: y / (3 * a) };
};

// A wider authored range for each construction, keeping givens fixed.
const ranges = {
  "REP-01": [17, 27.5],
  "REP-02": [48, 58],
  "REP-03": [-74, -46],
  "REP-04": [1.12, 1.9],
  "REP-05": [20, 30],
  "REP-06": [0.5, 1.42],
  "REP-07": [0.28, 1.08],
  "REP-08": [0.06, 0.985],
  "REP-09": [4.0, 3.55],
} as const;
export const heroRange = (id: string) => ranges[id as keyof typeof ranges];
const margin: Record<string, number> = {
  "REP-01": 1.18,
  "REP-02": 1.16,
  "REP-09": 1.1,
};
const swing = (id: keyof typeof ranges, u: number) => {
  const [lo, hi] = ranges[id];
  return lo + (hi - lo) * u;
};

export function heroFrame(id: string, original: string, u: number): string {
  let s = original;
  const replace = (needle: string, value: string) => {
    if (!s.includes(needle)) throw Error(`${id}: missing ${needle}`);
    s = s.replace(needle, value);
  };
  const swap = (re: RegExp, value: string, tombstone: string) => {
    if (!re.test(s)) throw Error(`${id}: missing ${tombstone}`);
    s = s.replace(re, value);
  };
  const n = (v: number) => Number(v.toFixed(6)).toString();
  const at = (id: string, p: P) =>
    swap(
      new RegExp(`^${id}: Text\\(x=[^,]+, y=[^,]+`, "m"),
      `${id}: Text(x=${n(p.x)}, y=${n(p.y)}`,
      id,
    );
  const seed = (id: string, p: P) =>
    swap(
      new RegExp(`${id}: FillRegion\\(seedX=[^,]+, seedY=[^,]+`),
      `${id}: FillRegion(seedX=${n(p.x)}, seedY=${n(p.y)}`,
      id,
    );
  const label = (
    id: string,
    pos: string,
    distance?: number,
    annId = `ann_${id}`,
  ) =>
    swap(
      new RegExp(
        `^${annId}: Annotation\\(${id}, label="([^"]*)", labelPosition="[^"]*"(, labelDistance=[-\\d.]+)?`,
        "m",
      ),
      `${annId}: Annotation(${id}, label="$1", labelPosition="${pos}"${distance ? `, labelDistance=${distance}` : ""}`,
      annId,
    );
  switch (id) {
    case "REP-01": {
      const theta = swing("REP-01", u);
      replace("angle=40)", `angle=${n(2 * theta)})`);
      replace("angle=-80)", `angle=${n(-4 * theta)})`);
      const A = polar(5, 180),
        B = polar(5, 0),
        P1 = polar(5, 2 * theta),
        Q = polar(5, 180 - 4 * theta);
      const R = line(A, P1, B, Q);
      const K = rotate(B, A, -60);
      const S = line(A, B, R, K);
      const U = line(A, P1, S, { x: S.x + A.x - K.x, y: S.y + A.y - K.y });
      const T = line(B, Q, S, { x: S.x + B.x - K.x, y: S.y + B.y - K.y });
      // Region f runs A → arc → Q → R → A; sample the arc so the label sits in the big region.
      const arc: P[] = [];
      for (let i = 0; i <= 32; i++)
        arc.push(polar(5, 180 - (4 * theta * i) / 32));
      seed("areaF", polygonCentre([A, ...arc, Q, R]));
      at("f", polygonCentre([A, ...arc, Q, R]));
      seed("areaG", centre(U, S, T));
      at("g", centre(U, S, T));
      for (const [p, pos, dist] of [
        ["P", "top-right", 15],
        ["Q", "top-left", 19],
        ["R", "top-left", 12],
        ["S", "bottom", 12],
        ["U", "bottom-left", 13],
        ["T", "bottom-right", 13],
      ] as [string, string, number?][])
        label(p, pos, dist);
      break;
    }
    case "REP-02": {
      const alpha = swing("REP-02", u);
      replace("angle=52.5)", `angle=${n(alpha)})`);
      const A = polar(1, alpha),
        C = { x: 2, y: 0 },
        M = { x: 1, y: 0 };
      const H = {
        x: Math.cos((alpha * Math.PI) / 180) ** 2,
        y:
          Math.cos((alpha * Math.PI) / 180) * Math.sin((alpha * Math.PI) / 180),
      };
      const r = Math.hypot(M.x - H.x, M.y - H.y),
        t = r / Math.hypot(A.x - M.x, A.y - M.y);
      const D = { x: M.x + t * (A.x - M.x), y: M.y + t * (A.y - M.y) };
      const E = line(M, A, H, C);
      replace(
        'labelAnchor="middle", labelSide="left", labelOffset=76',
        'labelAnchor="start", labelSide="left", labelOffset=58',
      );
      replace("labelOffset=118", "labelOffset=86");
      seed("areaF", incenter(D, C, E));
      at("f", incenter(D, C, E));
      const gMid = incenter(H, E, M);
      // Slide toward E so the label clears the thin HM edge.
      seed("areaG", gMid);
      at("g", gMid);
      // Slightly smaller labels fit the thinner of the two regions.
      swap(
        /text="\$f\(\\theta\)\$", isLatex/,
        'text="$f(\\theta)$", fontSize=13, isLatex',
        "f text",
      );
      swap(
        /text="\$g\(\\theta\)\$", isLatex/,
        'text="$g(\\theta)$", fontSize=12, isLatex',
        "g text",
      );
      for (const [p, pos, dist] of [
        ["A", "top", 17],
        ["B", "bottom-left"],
        ["C", "bottom-right"],
        ["H", "left", 16],
        ["D", "top-right", 13],
        ["E", "right", 14],
      ] as [string, string, number?][])
        label(p, pos, dist);
      break;
    }
    case "REP-03":
      replace("azimuth=-60", `azimuth=${n(swing("REP-03", u))}`);
      break;
    case "REP-04":
      replace("offset=1.5)", `offset=${n(swing("REP-04", u))})`);
      break;
    case "REP-05":
      replace("elevation=24.2", `elevation=${n(swing("REP-05", u))}`);
      break;
    case "REP-06":
      replace("@let: mid = 0.93", `@let: mid = ${n(swing("REP-06", u))}`);
      break;
    case "REP-07":
      replace("0.53-x/6", `${n(swing("REP-07", u))}-x/6`);
      // Keep the axis letter and R clear of the shallow line and the steep chord.
      replace("tx: Text(x=6.78, y=-0.27", "tx: Text(x=6.9, y=-0.13");
      label("R", "right", 16, "aR");
      break;
    case "REP-08": {
      const t = swing("REP-08", u);
      const marker = "---annotations---";
      replace(
        marker,
        `probe: PointOnPath(arc, t=${n(t)})\n${marker}\nann_hero: Annotation(probe, pointSize=4)`,
      );
      break;
    }
    case "REP-09": {
      const kk = swing("REP-09", u);
      replace("K: FreePoint(4,0)", `K: FreePoint(${n(kk)},0)`);
      replace('"5-x"', `"${n(kk + Math.log2(kk - 2))}-x"`);
      replace("tk: Text(x=4,", `tk: Text(x=${n(kk)},`);
      replace(
        "---annotations---",
        "AB: Segment(A -> B)\nBC: Segment(B -> C)\n---annotations---\naAB: Annotation(AB, opacity=0)\naBC: Annotation(BC, opacity=0)",
      );
      replace('boundaries="AC kLine h"', 'boundaries="AC AB BC"');
      replace('boundaries="CD DB h"', 'boundaries="CD DB BC"');
      break;
    }
    default:
      throw Error("Unknown hero code: " + id);
  }
  // Keep one scale for every frame so growth never looks like a zoom.
  const f = margin[id];
  if (f) {
    const m =
      /^@frame:\s*x=([-\d.]+),\s*y=([-\d.]+),\s*width=([\d.]+),\s*height=([\d.]+)$/m.exec(
        s,
      );
    if (!m) throw Error(`${id}: missing @frame`);
    const [x, y, w, h] = m.slice(1).map(Number);
    replace(
      m[0],
      `@frame: x=${n(x - (w * (f - 1)) / 2)}, y=${n(y - (h * (f - 1)) / 2)}, width=${n(w * f)}, height=${n(h * f)}`,
    );
  }
  return s;
}
