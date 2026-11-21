# @code: VEC-01
# @title: 내분점과 외분점의 위치벡터
# @summary: 같은 두 끝점과 비에서 얻은 내분점과 외분점으로 위치벡터를 그린다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-1, y=-1.6, width=9, height=6
O: FreePoint(1, 3)
A: FreePoint(0, 0)
B: FreePoint(3, 0)
M: Division(A, B, m=2, n=1, kind=internal)
N: Division(A, B, m=2, n=1, kind=external)
AN: Segment(A -> N)
OM: Vector(O -> M)
ON: Vector(O -> N)
---annotations---
ann_M: Annotation(M, visible=true, label="$\mathrm{M}$", labelPosition="bottom", pointSize=0)
ann_N: Annotation(N, visible=true, label="$\mathrm{N}$", labelPosition="bottom", pointSize=0)
ann_O: Annotation(O, visible=true, label="$\mathrm{O}$", labelPosition="top", pointSize=0)
