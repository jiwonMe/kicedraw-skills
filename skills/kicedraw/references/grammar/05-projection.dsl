# 눈금 없이 주어진 점의 x좌표만 투영
@version: "1.1.0"
@frame: x=-1, y=-1.3, width=5.5, height=5.5
@axes: xMin=-0.6, xMax=4, yMin=-0.7, yMax=3.8
A: FreePoint(0, 0)
B: FreePoint(1, 0)
P: FreePoint(2.5, 2.7)
H: Projection(P onto A -> B)
PH: Segment(P -> H)
---annotations---
ann_P: Annotation(P, visible=true, label="$\mathrm{P}$", labelPosition="top", pointSize=3)
ann_H: Annotation(H, visible=true, label="$a$", labelPosition="bottom", pointSize=0)
ann_PH: Annotation(PH, visible=true, lineDash=[4,4])
ann_A: Annotation(A, visible=true, pointSize=0)
ann_B: Annotation(B, visible=true, pointSize=0)
