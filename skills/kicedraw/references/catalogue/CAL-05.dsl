# @code: CAL-05
# @title: 외부점에서 삼차함수에 그은 접선
# @summary: 외부점과 곡선에서 접점을 구한 뒤 두 점을 잇는다.
# @widthMm: 60
@version: "1.1.0"
@axes: xMin=-2, xMax=4, yMin=-3, yMax=5
f: Function("x^3-3*x", xMin=-2.1, xMax=2.3)
P: FreePoint(3, -2)
T: FuncTangent(P, f, index=0)
tl: Line(P -> T)
---annotations---
ann_P: Annotation(P, visible=true, label="$\mathrm{P}$", labelPosition="bottom-left", labelDistance=30, pointSize=0)
ann_T: Annotation(T, visible=true, label="$\mathrm{T}$", labelPosition="bottom-left", labelDistance=30, pointSize=0)
t1: Text(x=0.9, y=4.1, text="$y=f(x)$", isLatex=true)
