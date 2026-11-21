# @code: CON-01
# @title: 포물선의 초점과 준선
# @summary: 포물선 위 점에서 초점과 준선까지의 같은 거리를 두 선분으로 비교한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-4, y=-2.5, width=8, height=7
F: FreePoint(0, 1)
A: FreePoint(-3, -1)
B: FreePoint(3, -1)
d: Line(A -> B)
f: QuadraticFD(focus=F, directrix=A -> B)
U: FreePoint(2, 0)
V: FreePoint(2, 2)
v: Line(U -> V)
P: Intersect(f, v, index=0)
H: Projection(P onto A -> B)
PH: Segment(P -> H)
PF: Segment(P -> F)
---annotations---
ann_U: Annotation(U, visible=false)
ann_V: Annotation(V, visible=false)
ann_v: Annotation(v, visible=false)
ann_A: Annotation(A, visible=false)
ann_B: Annotation(B, visible=false)
ann_d: Annotation(d, visible=true, lineDash=[4,4])
ann_F: Annotation(F, visible=true, label="$\mathrm{F}$", labelPosition="top-left", pointSize=0)
ann_H: Annotation(H, visible=true, label="$\mathrm{H}$", labelPosition="bottom-right", pointSize=0)
