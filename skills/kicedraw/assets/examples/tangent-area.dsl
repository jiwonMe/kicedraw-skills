# 외부점 P에서 포물선에 그은 접선. 접선과 두 좌표축으로 둘러싸인 삼각형의 넓이.
@version: "1.1.0"
@frame: x=-1.2, y=-2, width=4.7, height=6.8
@axes: xMin=-0.7, xMax=3, yMin=-1.5, yMax=4.3
f: Function("x^2", xMin=0, xMax=2.1)
P: FreePoint(0, -1)
T: FuncTangent(P, f, index=0)
tangent: Line(P -> T)
---annotations---
ann_P: Annotation(P, visible=true, label="$\mathrm{P}$", labelPosition="bottom-right", pointSize=0)
ann_T: Annotation(T, visible=true, label="$\mathrm{T}$", labelPosition="top-left", pointSize=0)
area: FillRegion(seedX=0.25, seedY=-0.15, visible=true, fillColor=0, fillOpacity=0.18)
