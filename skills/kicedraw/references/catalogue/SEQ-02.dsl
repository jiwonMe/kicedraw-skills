# @code: SEQ-02
# @title: 포물선 위의 점열과 투영
# @summary: 서로 다른 매개변수에서 잡은 점들을 x축에 투영해 좌표열을 읽는다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-1, y=-1, width=5.6, height=5.2
@axes: xMin=-0.5, xMax=4.1, yMin=-0.5, yMax=3.7
f: Function("x^2/4", xMin=0, xMax=3.7)
O: FreePoint(0, 0)
U: FreePoint(1, 0)
A: PointOnPath(f, t=0.25)
B: PointOnPath(f, t=0.57)
C: PointOnPath(f, t=0.88)
H: Projection(A onto O -> U)
K: Projection(B onto O -> U)
L: Projection(C onto O -> U)
AH: Segment(A -> H)
BK: Segment(B -> K)
CL: Segment(C -> L)
---annotations---
ann_O: Annotation(O, visible=false)
ann_U: Annotation(U, visible=false)
ann_AH: Annotation(AH, visible=true, lineDash=[4,4])
ann_BK: Annotation(BK, visible=true, lineDash=[4,4])
ann_CL: Annotation(CL, visible=true, lineDash=[4,4])
ann_A: Annotation(A, visible=true, pointSize=3)
ann_B: Annotation(B, visible=true, pointSize=3)
ann_C: Annotation(C, visible=true, pointSize=3)
