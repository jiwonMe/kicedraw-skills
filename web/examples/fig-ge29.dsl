# REP-04 · F를 (1,0)으로 정규화. 준선 x=-1, 포물선 y²=4x.
# 쌍곡선의 중심과 반축은 그림에서 읽은 대표값이며 발문 조건으로 단정하지 않는다.
# @widthMm: 78
@version: "1.1.0"
@frame: x=-2.656, y=-1.035, width=5.2, height=4.43
@axes: xMin=-2.31, xMax=2.19, yMin=-0.76, yMax=3.07, showLabels=false
O: FreePoint(0,0)
F: FreePoint(1,0)
N: ReflectPoint(F about O)
U: VectorOffset(N, ux=0, uy=-1, offset=0.76)
V: VectorOffset(N, ux=0, uy=1, offset=3)
directrix: Segment(U -> V)
# 옆으로 열린 포물선. B에서 준선에 그은 수선과의 교점이 A.
parabola: QuadraticFD(focus=F, directrix=U -> V)
B: VectorOffset(N, ux=0, uy=1, offset=1.5)
level: PerpendicularLine(B, U -> V)
A: Intersect(level, parabola, index=0)
BA: Segment(B -> A)
# B,A를 초점으로 택하면 반축 a=15/32, b=5/8인 두 가지가 원본과 일치한다.
C: Division(B, A, m=1, n=4, kind=internal)
hyp: Hyperbola(focus1=B, focus2=A, through=C)
---annotations---
hypRange: Annotation(hyp, useGraphRange=true, graphXMin=-2.31, graphXMax=2.19, graphYMin=-0.76, graphYMax=3)
clip: Annotation(parabola, useGraphRange=true, graphXMin=-2.31, graphXMax=2.19, graphYMin=-0.76, graphYMax=3)
hideLevel: Annotation(level, visible=false)
hideN: Annotation(N, pointSize=0)
hideU: Annotation(U, pointSize=0)
hideV: Annotation(V, pointSize=0)
a: Annotation(A, label="$\mathrm{A}$", labelPosition="bottom-right", pointSize=0)
bLabel: Annotation(B, label="$\mathrm{B}$", labelPosition="left", pointSize=0)
c: Annotation(C, label="$\mathrm{C}$", labelPosition="bottom-right", pointSize=0)
f: Annotation(F, label="$\mathrm{F}$", labelPosition="bottom-left", pointSize=0)
o: Annotation(O, label="$\mathrm{O}$", labelPosition="bottom-left", pointSize=0)
angle: AngleAnnotation(A, B, V, markKind="right", radius=16)
x: Text(x=2.14, y=-0.11, text="$x$", isLatex=true)
y: Text(x=-0.10, y=3.04, text="$y$", isLatex=true)
eq: Text(x=1.98, y=2.56, text="$y^2=4px$", isLatex=true)
