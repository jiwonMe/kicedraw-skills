# @code: TRI-05
# @title: 사인함수와 수평선
# @summary: 한 주기의 두 교점이 극대점의 수직선을 기준으로 대칭임을 표시한다.
# @widthMm: 80
@version: "1.1.0"
@frame: x=-0.9, y=-1.9, width=8.4, height=4
@axes: xMin=-0.5, xMax=6.8, yMin=-1.5, yMax=1.65
f: Function("sin(x)", xMin=0, xMax=6.28)
g: Function("0.55", xMin=0, xMax=6.28)
A: Intersect(f, g, index=0)
B: Intersect(f, g, index=1)
M: MidPoint(A, B)
U: FreePoint(0, 0)
V: FreePoint(1, 0)
H: Projection(M onto U -> V)
MH: Segment(M -> H)
---annotations---
ann_U: Annotation(U, visible=false)
ann_V: Annotation(V, visible=false)
ann_MH: Annotation(MH, visible=true, lineDash=[4,4])
ann_A: Annotation(A, visible=true, label="$\mathrm{A}$", labelPosition="top-left", pointSize=0)
ann_B: Annotation(B, visible=true, label="$\mathrm{B}$", labelPosition="top-right", pointSize=0)
