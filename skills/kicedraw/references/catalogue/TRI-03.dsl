# @code: TRI-03
# @title: 원에 내접하는 사각형
# @summary: 내접 사각형의 대각선을 그어 같은 현을 바라보는 원주각을 비교한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-4.2, y=-4.1, width=8.4, height=8.2
O: FreePoint(0, 0)
A: FreePoint(3, 0)
c: Circle(center=O, through=A)
B: RotatePoint(A about O, angle=68)
C: RotatePoint(A about O, angle=153)
D: RotatePoint(A about O, angle=246)
AB: Segment(A -> B)
BC: Segment(B -> C)
CD: Segment(C -> D)
DA: Segment(D -> A)
AC: Segment(A -> C)
---annotations---
ann_O: Annotation(O, visible=false)
ann_AC: Annotation(AC, visible=true, lineDash=[4,4])
ann_B: Annotation(B, visible=true, label="$\mathrm{B}$", labelPosition="top", pointSize=0)
ann_D: Annotation(D, visible=true, label="$\mathrm{D}$", labelPosition="bottom", pointSize=0)
