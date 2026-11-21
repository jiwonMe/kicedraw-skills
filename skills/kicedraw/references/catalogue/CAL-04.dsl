# @code: CAL-04
# @title: 두 곡선 사이 넓이
# @summary: 두 그래프 사이 닫힌 면에 시드를 두어 적분 구간을 구분한다.
# @widthMm: 60
@version: "1.1.0"
@axes: xMin=-1, xMax=3, yMin=-1, yMax=5
f: Function("x^2", xMin=-0.5, xMax=2.3)
g: Function("2*x", xMin=-0.5, xMax=2.3)
---annotations---
fr: FillRegion(seedX=1, seedY=1.5, visible=true, fillColor=0, fillOpacity=1, pattern="hatch", patternAngle=135, patternSpacing=5)
t1: Text(x=1.05, y=4.4, text="$y=x^2$", isLatex=true)
t2: Text(x=2.7, y=3.4, text="$y=2x$", isLatex=true)
