# @code: SPC-03
# @title: 삼수선과 두 수선의 발
# @summary: 공간점 P의 평면 위 발 H와 H에서 밑변에 내린 발 K를 같은 투영도에 표시한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-1, y=-1, width=9, height=7
A: FreePoint(0, 0)
B: Point3D(A, x=6, y=0, z=0)
C: Point3D(A, x=6, y=4, z=0)
D: Point3D(A, x=0, y=4, z=0)
H: Point3D(A, x=2, y=3, z=0)
K: Point3D(A, x=2, y=0, z=0)
P: Point3D(A, x=2, y=3, z=3)
AB: Segment(A -> B)
BC: Segment(B -> C)
CD: Segment(C -> D)
DA: Segment(D -> A)
PH: Segment(P -> H)
HK: Segment(H -> K)
KP: Segment(K -> P)
---annotations---
ann_HK: Annotation(HK, visible=true, lineDash=[4,4])
ann_PH: Annotation(PH, visible=true, lineDash=[4,4])
ann_P: Annotation(P, visible=true, label="$\mathrm{P}$", labelPosition="top", pointSize=0)
ann_H: Annotation(H, visible=true, label="$\mathrm{H}$", labelPosition="right", pointSize=0)
ann_K: Annotation(K, visible=true, label="$\mathrm{K}$", labelPosition="bottom", pointSize=0)
