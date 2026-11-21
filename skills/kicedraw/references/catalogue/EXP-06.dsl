# @code: EXP-06
# @title: 절댓값 로그함수의 두 교점
# @summary: 같은 양의 함수값을 갖는 두 x좌표의 곱이 1인 구조를 읽는다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-0.9, y=-0.8, width=5.8, height=4.6
@axes: xMin=-0.4, xMax=4.4, yMin=-0.3, yMax=3.1
f: Function("abs(log(x)/log(2))", xMin=0.12, xMax=4.2)
g: Function("1.5", xMin=0.1, xMax=4.2)
A: Intersect(f, g, index=0)
B: Intersect(f, g, index=1)
---annotations---
ann_A: Annotation(A, visible=true, label="$\mathrm{A}$", labelPosition="bottom-left", pointSize=0)
ann_B: Annotation(B, visible=true, label="$\mathrm{B}$", labelPosition="bottom-right", pointSize=0)
