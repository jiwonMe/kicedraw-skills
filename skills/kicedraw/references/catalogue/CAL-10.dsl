# @code: CAL-10
# @title: 역함수 정적분의 넓이 분할
# @summary: 단조함수와 역함수 사이 영역을 y=x로 나누어 대칭인 두 부분을 비교한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-0.8, y=-0.8, width=3.3, height=3.3
@axes: xMin=-0.3, xMax=2.1, yMin=-0.3, yMax=2.1
f: Function("x^2", xMin=0, xMax=1.4)
g: Function("sqrt(x)", xMin=0, xMax=1.95)
h: Function("x", xMin=0, xMax=1.85)
---annotations---
ann_h: Annotation(h, visible=true, lineDash=[4,4])
fr: FillRegion(seedX=0.45, seedY=0.57, visible=true, fillColor=0, fillOpacity=0.18)
