# @code: SPC-05
# @title: 구의 평면 단면과 단면의 중심
# @summary: 중심 O에서 평면으로 내린 수선과 단면 반지름, 구의 반지름을 직각삼각형으로 연결한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-4.2, y=-4.1, width=8.4, height=8.2
O: FreePoint(0, 0)
sphere: Circle(center=O, radius=3)
H: FreePoint(0, 1.8)
X: VectorOffset(H, ux=1, uy=0, offset=1)
cut: Line(H -> X)
R: Intersect(sphere, cut, index=1)
S: VectorOffset(H, ux=0, uy=1, offset=0.48)
e: Ellipse(center=H, major=R, minor=S)
OH: Segment(O -> H)
HR: Segment(H -> R)
RO: Segment(R -> O)
---annotations---
ann_X: Annotation(X, visible=false)
ann_cut: Annotation(cut, visible=false)
ann_S: Annotation(S, visible=false)
ann_OH: Annotation(OH, visible=true, lineDash=[4,4])
ann_HR: Annotation(HR, visible=true, lineDash=[4,4])
ann_O: Annotation(O, visible=true, label="$\mathrm{O}$", labelPosition="bottom", pointSize=0)
ann_R: Annotation(R, visible=true, label="$\mathrm{R}$", labelPosition="top-right", labelDistance=30, pointSize=0)
ang: AngleAnnotation(O, H, R, visible=true, markKind="right", radius=15)
