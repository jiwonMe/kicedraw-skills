# @code: VEC-03
# @title: 정육각형에서의 벡터 분해
# @summary: 같은 중심 주위로 회전한 꼭짓점을 이어 두 변 벡터와 합벡터를 비교한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-4.2, y=-4.1, width=8.4, height=8.2
O: FreePoint(0, 0)
A: FreePoint(3, 0)
B: RotatePoint(A about O, angle=60)
C: RotatePoint(A about O, angle=120)
D: RotatePoint(A about O, angle=180)
E: RotatePoint(A about O, angle=240)
F: RotatePoint(A about O, angle=300)
CD: Segment(C -> D)
DE: Segment(D -> E)
EF: Segment(E -> F)
FA: Segment(F -> A)
AB: Vector(A -> B)
BC: Vector(B -> C)
AC: Vector(A -> C)
---annotations---
ann_O: Annotation(O, visible=false)
ann_C: Annotation(C, visible=true, label="$\mathrm{C}$", labelPosition="top", pointSize=0)
ann_A: Annotation(A, visible=true, label="$\mathrm{A}$", labelPosition="right", pointSize=0)
