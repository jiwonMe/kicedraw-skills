# @code: SPC-02
# @title: 정육면체의 대각 단면과 이면각
# @summary: 앞 모서리 AB와 뒤 윗모서리 GH를 지나는 단면에서 단면과 밑면의 기울기를 비교한다.
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
AH: Segment(A -> H)
BG: Segment(B -> G)
---annotations---
ann_CD: Annotation(CD, visible=true, lineDash=[4,4])
ann_DA: Annotation(DA, visible=true, lineDash=[4,4])
ann_DH: Annotation(DH, visible=true, lineDash=[4,4])
ann_AH: Annotation(AH, visible=true, lineDash=[4,4])
ang: AngleAnnotation(C, B, G, visible=true, autoRightAngle=false, label="$\theta$", radius=24)
