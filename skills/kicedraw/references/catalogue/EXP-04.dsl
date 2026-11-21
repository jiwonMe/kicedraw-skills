# @code: EXP-04
# @title: 지수·로그 역함수와 직각삼각형
# @summary: 기울기 −1인 선 위의 두 교점은 y=x에 대칭이다. 중점에서 직각이 생긴다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-1, y=-1, width=5, height=5
@axes: xMin=-0.5, xMax=3.4, yMin=-0.5, yMax=3.4
f: Function("2^x", xMin=-0.6, xMax=1.8)
g: Function("log(x)/log(2)", xMin=0.7, xMax=3.4)
s: Function("3-x", xMin=0, xMax=3)
O: FreePoint(0, 0)
A: Intersect(s, f, index=0)
B: Intersect(s, g, index=0)
M: MidPoint(A, B)
OM: Segment(O -> M)
OA: Segment(O -> A)
---annotations---
ann_OM: Annotation(OM, visible=true, lineDash=[4,4])
r: AngleAnnotation(O, M, A, visible=true, markKind="right", radius=16)
