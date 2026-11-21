# @code: CON-05
# @title: 포물선의 접선과 축 절편
# @summary: 곡선 밖의 점에서 그은 접선과 y축의 교점을 함께 표시한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-2, y=-3.5, width=6.5, height=9
@axes: xMin=-1.5, xMax=4, yMin=-3, yMax=5
f: Function("(x-1)^2", xMin=-0.7, xMax=3.2)
P: FreePoint(2, -2)
T: FuncTangent(P, f, index=0)
l: Line(P -> T)
B: Intersect(l, Axis(y), index=0)
---annotations---
ann_T: Annotation(T, visible=true, label="$\mathrm{T}$", labelPosition="top-right", pointSize=0)
ann_P: Annotation(P, visible=true, label="$\mathrm{P}$", labelPosition="bottom-left", labelDistance=28, pointSize=0)
