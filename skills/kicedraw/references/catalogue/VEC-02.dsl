# @code: VEC-02
# @title: 원 위 점의 벡터합
# @summary: 두 위치벡터를 변으로 하는 평행사변형과 대각선의 합벡터를 구성한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-4.2, y=-4.1, width=10, height=9
O: FreePoint(0, 0)
A: FreePoint(3, 0)
c: Circle(center=O, through=A)
P: RotatePoint(A about O, angle=65)
Q: TranslatePoint(P by O -> A)
OA: Vector(O -> A)
OP: Vector(O -> P)
OQ: Vector(O -> Q)
PQ: Segment(P -> Q)
AQ: Segment(A -> Q)
---annotations---
ann_PQ: Annotation(PQ, visible=true, lineDash=[4,4])
ann_AQ: Annotation(AQ, visible=true, lineDash=[4,4])
ann_Q: Annotation(Q, visible=true, label="$\mathrm{Q}$", labelPosition="right", pointSize=0)
