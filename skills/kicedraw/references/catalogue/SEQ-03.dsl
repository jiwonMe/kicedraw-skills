# @code: SEQ-03
# @title: 정삼각형의 반복 내접
# @summary: 무게중심을 중심으로 −1/2배 축소를 두 번 적용해 내접 닮음비를 보인다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-1, y=-0.9, width=7.5, height=6.3
A: FreePoint(0, 0)
B: FreePoint(5, 0)
C: RotatePoint(B about A, angle=60)
G: Centroid(A, B, C)
AB: Segment(A -> B)
BC: Segment(B -> C)
CA: Segment(C -> A)
D: DilatePoint(A about G, factor=-0.5)
E: DilatePoint(B about G, factor=-0.5)
F: DilatePoint(C about G, factor=-0.5)
H: DilatePoint(D about G, factor=-0.5)
I: DilatePoint(E about G, factor=-0.5)
J: DilatePoint(F about G, factor=-0.5)
DE: Segment(D -> E)
EF: Segment(E -> F)
FD: Segment(F -> D)
HI: Segment(H -> I)
IJ: Segment(I -> J)
JH: Segment(J -> H)
---annotations---
ann_G: Annotation(G, visible=false)
