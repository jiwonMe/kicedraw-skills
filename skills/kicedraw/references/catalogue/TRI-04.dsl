# @code: TRI-04
# @title: 지름을 빗변으로 하는 삼각형
# @summary: 반원 위의 점을 옮겨도 지름을 바라보는 각이 직각임을 보인다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-4, y=-1.2, width=8, height=5.4
O: FreePoint(0, 0)
A: FreePoint(3, 0)
B: RotatePoint(A about O, angle=180)
P: RotatePoint(A about O, angle=64)
arc: Arc(center=O, start=A, end=B, direction=ccw)
AP: Segment(A -> P)
PB: Segment(P -> B)
BA: Segment(B -> A)
---annotations---
ann_O: Annotation(O, visible=false)
r: AngleAnnotation(A, P, B, visible=true, markKind="right", radius=20)
