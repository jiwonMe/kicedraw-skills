# @code: SPC-04
# @title: 원기둥 윗면의 정사영
# @summary: 수평면에 평행한 두 원의 투영은 같은 타원이며 대응점을 수직 모선으로 잇는다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-4, y=-1.8, width=8, height=8
O: FreePoint(0, 0)
A: FreePoint(3, 0)
B: FreePoint(0, 0.8)
C: FreePoint(-3, 0)
U: FreePoint(0, 4)
e: Ellipse(center=O, major=A, minor=B)
D: TranslatePoint(A by O -> U)
E: TranslatePoint(B by O -> U)
F: TranslatePoint(C by O -> U)
f: Ellipse(center=U, major=D, minor=E)
AD: Segment(A -> D)
CF: Segment(C -> F)
OU: Segment(O -> U)
---annotations---
ann_OU: Annotation(OU, visible=true, lineDash=[4,4])
ann_A: Annotation(A, visible=false)
ann_B: Annotation(B, visible=false)
ann_C: Annotation(C, visible=false)
ann_D: Annotation(D, visible=false)
ann_E: Annotation(E, visible=false)
ann_F: Annotation(F, visible=false)
ann_O: Annotation(O, visible=false)
ann_U: Annotation(U, visible=false)
