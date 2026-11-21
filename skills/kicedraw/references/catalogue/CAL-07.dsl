# @code: CAL-07
# @title: 삼차함수의 극점과 변곡점
# @summary: 두 수평 접점의 중점이 변곡점에 해당하는 대칭 구조를 읽는다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-3, y=-3.4, width=6, height=7
@axes: xMin=-2.6, xMax=2.6, yMin=-2.8, yMax=2.8
f: Function("x^3-3*x", xMin=-2.1, xMax=2.1)
U: FreePoint(-2, 0)
V: FreePoint(2, 0)
A: FuncParallelTangent(U -> V, f, index=0)
B: FuncParallelTangent(U -> V, f, index=1)
I: MidPoint(A, B)
AB: Segment(A -> B)
---annotations---
ann_U: Annotation(U, visible=false)
ann_V: Annotation(V, visible=false)
ann_AB: Annotation(AB, visible=true, lineDash=[4,4])
ann_A: Annotation(A, visible=true, label="$\mathrm{A}$", labelPosition="top-left", pointSize=0)
ann_B: Annotation(B, visible=true, label="$\mathrm{B}$", labelPosition="bottom-right", pointSize=0)
