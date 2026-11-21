# @code: SEQ-04
# @title: 사분원과 내접 정사각형의 반복
# @summary: 반지름의 45도 방향 점을 축에 투영해 정사각형을 만들고 더 작은 사분원에서 반복한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-0.8, y=-0.8, width=5, height=5
O: FreePoint(0, 0)
A: FreePoint(3, 0)
B: RotatePoint(A about O, angle=90)
arc: Arc(center=O, start=A, end=B, direction=ccw)
AO: Segment(A -> O)
OB: Segment(O -> B)
P: RotatePoint(A about O, angle=45)
H: Projection(P onto O -> A)
K: Projection(P onto O -> B)
HP: Segment(H -> P)
PK: Segment(P -> K)
arc2: Arc(center=O, start=H, end=K, direction=ccw)
Q: RotatePoint(H about O, angle=45)
U: Projection(Q onto O -> A)
V: Projection(Q onto O -> B)
UQ: Segment(U -> Q)
QV: Segment(Q -> V)
---annotations---
