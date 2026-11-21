# @code: VEC-04
# @title: 단위벡터 끝점의 평행이동 자취
# @summary: 단위원과 기준벡터로 이동한 원에서 대응하는 끝점의 위치를 비교한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-2, y=-2, width=8, height=5
O: FreePoint(0, 0)
U: FreePoint(1, 0)
B: FreePoint(3, 1)
c: Circle(center=O, through=U)
P: RotatePoint(U about O, angle=65)
Q: TranslatePoint(P by O -> B)
d: Circle(center=B, through=Q)
OB: Vector(O -> B)
OP: Vector(O -> P)
BQ: Vector(B -> Q)
PQ: Segment(P -> Q)
---annotations---
ann_PQ: Annotation(PQ, visible=true, lineDash=[4,4])
ann_U: Annotation(U, visible=false)
