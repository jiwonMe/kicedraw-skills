# @code: CAL-08
# @title: 움직이는 수평선과 삼차함수
# @summary: 수평선 높이에 따라 실근이 한 개 또는 세 개가 되는 두 경우를 비교한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-3, y=-3.2, width=6.5, height=7.4
@axes: xMin=-2.5, xMax=2.7, yMin=-2.7, yMax=3.6
f: Function("x^3-3*x", xMin=-2.1, xMax=2.2)
g: Function("1", xMin=-2.4, xMax=2.4)
h: Function("3", xMin=-2.4, xMax=2.4)
P0: Intersect(f, g, index=0)
P1: Intersect(f, g, index=1)
P2: Intersect(f, g, index=2)
Q: Intersect(f, h, index=0)
---annotations---
ann_h: Annotation(h, visible=true, lineDash=[4,4])
ann_P0: Annotation(P0, visible=true, pointSize=3)
ann_P1: Annotation(P1, visible=true, pointSize=3)
ann_P2: Annotation(P2, visible=true, pointSize=3)
ann_Q: Annotation(Q, visible=true, pointSize=3)
