# @code: SPC-01
# @title: 정육면체의 보이는 모서리와 숨은 모서리
# @summary: 기존 공간도형 픽스처의 정육면체를 분리해 뒤쪽 세 모서리만 점선으로 둔다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-1, y=-1, width=7.5, height=7.5
A: FreePoint(0, 0)
B: Point3D(A, x=4, y=0, z=0)
C: Point3D(A, x=4, y=4, z=0)
D: Point3D(A, x=0, y=4, z=0)
E: Point3D(A, x=0, y=0, z=4)
F: Point3D(A, x=4, y=0, z=4)
G: Point3D(A, x=4, y=4, z=4)
H: Point3D(A, x=0, y=4, z=4)
AB: Segment(A -> B)
BC: Segment(B -> C)
CD: Segment(C -> D)
DA: Segment(D -> A)
EF: Segment(E -> F)
FG: Segment(F -> G)
GH: Segment(G -> H)
HE: Segment(H -> E)
AE: Segment(A -> E)
BF: Segment(B -> F)
CG: Segment(C -> G)
DH: Segment(D -> H)
---annotations---
ann_CD: Annotation(CD, visible=true, lineDash=[4,4])
ann_DA: Annotation(DA, visible=true, lineDash=[4,4])
ann_DH: Annotation(DH, visible=true, lineDash=[4,4])
