# @code: EXP-05
# @title: 이동한 지수함수의 세로 절편
# @summary: 두 함수에 같은 수직선을 그어 교점 사이의 선분과 둘러싸인 넓이를 연결한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-1.2, y=-0.8, width=4.4, height=6.6
@axes: xMin=-0.7, xMax=2.7, yMin=-0.3, yMax=5.3
f: Function("2^x", xMin=0, xMax=2.2)
g: Function("2^(x-1)", xMin=0, xMax=2.2)
A: FreePoint(2, 0)
B: FreePoint(2, 5)
s: Line(A -> B)
P: Intersect(s, f, index=0)
Q: Intersect(s, g, index=0)
PQ: Segment(P -> Q)
---annotations---
ann_s: Annotation(s, visible=false)
ann_A: Annotation(A, visible=false)
ann_B: Annotation(B, visible=false)
fr: FillRegion(seedX=1, seedY=1.5, visible=true, fillColor=0, fillOpacity=0.18)
ann_P: Annotation(P, visible=true, label="$\mathrm{P}$", labelPosition="top-left", pointSize=0)
ann_Q: Annotation(Q, visible=true, label="$\mathrm{Q}$", labelPosition="bottom-right", pointSize=0)
