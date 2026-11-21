# @code: TRI-07
# @title: 각의 이등분선으로 나눈 두 삼각형
# @summary: 각의 이등분선과 맞은편 변의 교점을 잡아 두 삼각형의 공통변을 표시한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-1, y=-1.2, width=7, height=6
A: FreePoint(0, 0)
B: FreePoint(5, 0)
C: FreePoint(1.8, 3.1)
AB: Segment(A -> B)
BC: Segment(B -> C)
CA: Segment(C -> A)
bis: AngleBisector(B, A, C, kind=internal)
D: Intersect(bis, BC, index=0)
AD: Segment(A -> D)
---annotations---
ann_bis: Annotation(bis, visible=false)
ann_D: Annotation(D, visible=true, label="$\mathrm{D}$", labelPosition="top-right", labelDistance=25, pointSize=0)
a: AngleAnnotation(B, A, D, visible=true, radius=27)
b: AngleAnnotation(D, A, C, visible=true, radius=27)
