# 공통 수평선과 쌍곡선의 두 가지, 우개 포물선 및 준선. 초점거리 p=1로 정규화한다.
# @widthMm: 100
@version: "1.1.0"
@frame: x=-2.5, y=-0.87, width=5.12, height=4.13
@axes: xMin=-2.3, xMax=2.2, yMin=-0.75, yMax=3.06, showLabels=false
parab: ParametricCurve("t^2/4", "t", tMin=-0.75, tMax=2.96)
left: ParametricCurve("-0.22-0.47*sqrt(1+((t-1.5)/0.58)^2)", "t", tMin=-0.75, tMax=3)
right: ParametricCurve("-0.22+0.47*sqrt(1+((t-1.5)/0.58)^2)", "t", tMin=-0.75, tMax=3)
U: FreePoint(-1, -0.75)
V: VectorOffset(U, ux=0, uy=3.75, offset=3.75)
UV: Segment(U -> V)
A: PointOnPath(parab, t=0.606469)
B: Projection(A onto U -> V)
AB: Segment(A -> B)
C: Intersect(AB, left, index=0)
---annotations---
t_x: Text(x=2.18, y=-0.25, text="$x$", isLatex=true)
t_y: Text(x=-0.23, y=3.02, text="$y$", isLatex=true)
t_o: Text(x=-0.23, y=-0.25, text="$\mathrm{O}$", isLatex=true)
ann_UV: Annotation(UV, visible=true, lineWidth=2.6)
ann_A: Annotation(A, visible=true, label="$\mathrm{A}$", labelPosition="right", labelDistance=13, pointSize=0)
ann_B: Annotation(B, visible=true, label="$\mathrm{B}$", labelPosition="left", labelDistance=13, pointSize=0)
ann_C: Annotation(C, visible=true, label="$\mathrm{C}$", labelPosition="bottom-right", labelDistance=13, pointSize=0)
t_F: Text(x=0.94, y=-0.15, text="$\mathrm{F}$", isLatex=true)
t_eq: Text(x=2.03, y=2.57, text="$y^2=4px$", isLatex=true)
square: AngleAnnotation(V, B, A, visible=true, markKind="right", radius=16)
