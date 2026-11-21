# @code: TRI-01
# @title: 삼각형과 각 표시, 독립 텍스트
# @summary: 삼각형에서 내린 수선에 직각 표식을, 밑각에는 호를 쓴다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-4, y=-1.8, width=9, height=7
A: FreePoint(0, 4)
B: FreePoint(-3, 0)
C: FreePoint(4, 0)
AB: Segment(A -> B)
BC: Segment(B -> C)
CA: Segment(C -> A)
H: Projection(A onto B -> C)
AH: Segment(A -> H)
---annotations---
ann_A: Annotation(A, visible=true, label="$\mathrm{A}$", labelPosition="top")
ann_B: Annotation(B, visible=true, label="$\mathrm{B}$", labelPosition="bottom-left")
ann_C: Annotation(C, visible=true, label="$\mathrm{C}$", labelPosition="bottom-right")
ann_H: Annotation(H, visible=true, label="$\mathrm{H}$", labelPosition="bottom")
ann_AH: Annotation(AH, visible=true, lineDash=[4,4])
ang_H: AngleAnnotation(A, H, C, visible=true, markKind="right", radius=14)
ang_B: AngleAnnotation(C, B, A, visible=true, label="$\theta$", isLatex=true, radius=28)
t1: Text(x=0.5, y=-1.2, text="$7$", isLatex=true)
