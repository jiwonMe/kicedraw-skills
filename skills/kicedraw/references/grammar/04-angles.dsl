# 수선의 발에는 직각 기호, 다른 각에는 호
@version: "1.1.0"
@frame: x=-4, y=-0.8, width=9, height=5.7
A: FreePoint(0, 4)
B: FreePoint(-3, 0)
C: FreePoint(4, 0)
AB: Segment(A -> B)
BC: Segment(B -> C)
AC: Segment(A -> C)
H: Projection(A onto B -> C)
AH: Segment(A -> H)
---annotations---
ann_H: Annotation(H, visible=true, label="$\mathrm{H}$", labelPosition="bottom", pointSize=0)
ann_AH: Annotation(AH, visible=true, lineDash=[4,4])
right: AngleAnnotation(A, H, C, visible=true, markKind="right", radius=22)
arc: AngleAnnotation(C, B, A, visible=true, label="$\theta$", isLatex=true, radius=35)
