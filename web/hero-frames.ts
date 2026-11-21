// Build-time variations only. Each frame is a new DSL construction, not an image transform.
export function heroFrame(id: string, original: string, u: number): string {
  let s = original;
  const replace = (needle: string, value: string) => {
    if (!s.includes(needle)) throw Error(`${id}: missing ${needle}`);
    s = s.replace(needle, value);
  };
  const n = (x: number) => Number(x.toFixed(8)).toString();
  const point = (declaration: string) => {
    const marker = "---annotations---";
    replace(
      marker,
      `${declaration}\n${marker}\nann_hero: Annotation(probe, pointSize=4)`,
    );
  };
  switch (id) {
    case "REP-01": {
      // Change both central angles together, keeping their ratio.
      const theta = 20 + 3 * u;
      replace("angle=40)", `angle=${n(2 * theta)})`);
      replace("angle=-80)", `angle=${n(-4 * theta)})`);
      // The inscribed equilateral triangle is the image of ABK by a homothety at R.
      const ta = Math.tan((theta * Math.PI) / 180),
        tb = Math.tan((2 * theta * Math.PI) / 180);
      const x = (5 * (tb - ta)) / (tb + ta),
        y = (x + 5) * ta,
        k = y / (y + 5 * Math.sqrt(3));
      const gx = n((1 - k) * x),
        gy = n((1 - k) * y - (k * 5 * Math.sqrt(3)) / 3);
      replace("seedX=1.5, seedY=1.2", `seedX=${gx}, seedY=${gy}`);
      replace("x=1.54, y=1.27", `x=${gx}, y=${gy}`);
      break;
    }
    case "REP-02":
      replace("angle=52.5)", `angle=${n(52.5 + 4 * u)})`);
      break;
    case "REP-03":
      replace("azimuth=-60", "azimuth=" + n(-60 + 14 * u));
      break;
    case "REP-04":
      replace(
        "B: VectorOffset(N, ux=0, uy=1, offset=1.5)",
        `B: VectorOffset(N, ux=0, uy=1, offset=${n(1.5 + 0.28 * u)})`,
      );
      break;
    case "REP-05":
      replace("elevation=24.2", "elevation=" + n(24.2 + 9 * u));
      break;
    case "REP-06":
      replace("@let: mid = 0.93", "@let: mid = " + n(0.93 + 0.42 * u));
      break;
    case "REP-07":
      replace("0.53-x/6", `${n(0.53 + 0.48 * u)}-x/6`);
      break;
    case "REP-08": {
      // Approach the open endpoint without ever attaining it.
      const t = 0.16 + 0.81 * u;
      point(`probe: PointOnPath(arc, t=${n(t)})`);
      break;
    }
    case "REP-09": {
      // The descending line must keep passing through B on the logarithm.
      const k = 4 - 0.36 * u;
      replace("K: FreePoint(4,0)", `K: FreePoint(${n(k)},0)`);
      replace('"5-x"', `"${n(k + Math.log2(k - 2))}-x"`);
      replace("tk: Text(x=4,", `tk: Text(x=${n(k)},`);
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
  return s;
}
