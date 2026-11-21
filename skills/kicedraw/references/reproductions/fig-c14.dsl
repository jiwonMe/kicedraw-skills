# 그림에 함수식은 제시되지 않아 평행이동한 로그함수 한 쌍으로 재현한다.
# @widthMm: 92
@version: "1.1.0"
@frame: x=-1.6, y=-1.8, width=9.25, height=8.25
@axes: xMin=-1.3, xMax=7.2, yMin=-1.6, yMax=5.95, showLabels=false
f: Function("1.5*log(x-(1.23))+2.8", xMin=1.284, xMax=7)
g: Function("1.5*log(x-(-0.64))+2.8", xMin=-0.586, xMax=7)
P: PointOnPath(f, t=0.0246676)
U: VectorOffset(P, ux=1, uy=-2, offset=2.236068)
V: VectorOffset(P, ux=1, uy=-0.1667, offset=1.0137992)
steep: Line(P -> U)
shallow: Line(P -> V)
R: Intersect(steep, g, index=0)
Q: Intersect(shallow, g, index=0)
---annotations---
t_x: Text(x=7.15, y=-0.25, text="$x$", isLatex=true)
t_y: Text(x=-0.23, y=5.75, text="$y$", isLatex=true)
t_o: Text(x=-0.23, y=-0.25, text="$\mathrm{O}$", isLatex=true)
ann_U: Annotation(U, visible=true, pointSize=0)
ann_steep: Annotation(steep, visible=true, useGraphRange=true, graphXMin=-1.2, graphXMax=7, graphYMin=-1.6, graphYMax=5.8)
ann_V: Annotation(V, visible=true, pointSize=0)
ann_shallow: Annotation(shallow, visible=true, useGraphRange=true, graphXMin=-1.2, graphXMax=7, graphYMin=-1.6, graphYMax=5.8)
ann_R: Annotation(R, visible=true, label="$\mathrm{R}$", labelPosition="right", labelDistance=13, pointSize=0)
ann_Q: Annotation(Q, visible=true, label="$\mathrm{Q}$", labelPosition="top-left", labelDistance=13, pointSize=0)
ann_P: Annotation(P, visible=true, label="$\mathrm{P}$", labelPosition="top-right", labelDistance=13, pointSize=0)
t_g: Text(x=4.4, y=5.8, text="$y=g(x)$", isLatex=true)
t_f: Text(x=5.7, y=3.72, text="$y=f(x)$", isLatex=true)
