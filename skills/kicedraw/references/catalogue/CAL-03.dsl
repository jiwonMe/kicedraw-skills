# @code: CAL-03
# @title: 이차함수와 x축의 교점
# @summary: 좌표축을 교점 소스로 사용해 이차함수의 절편을 표시한다.
# @widthMm: 60
@version: "1.1.0"
@axes: xMin=-3, xMax=4, yMin=-5, yMax=4
f: Function("x^2-x-2", xMin=-2.5, xMax=3.5)
A: Intersect(Axis(x), f, index=0)
B: Intersect(Axis(x), f, index=1)
C: Intersect(Axis(y), f, index=0)
---annotations---
ann_A: Annotation(A, visible=true, label="$\mathrm{A}$", labelPosition="top-left", pointSize=3)
ann_B: Annotation(B, visible=true, label="$\mathrm{B}$", labelPosition="top-right", pointSize=3)
ann_C: Annotation(C, visible=true, label="$\mathrm{C}$", labelPosition="left", pointSize=3)
