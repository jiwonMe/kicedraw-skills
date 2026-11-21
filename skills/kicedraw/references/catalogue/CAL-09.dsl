# @code: CAL-09
# @title: 도함수의 부호와 극값의 위치
# @summary: 도함수의 두 영점을 지나며 원함수의 극점으로 이어지는 수선을 그린다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-3.3, y=-3.8, width=6.8, height=8.2
@axes: xMin=-3, xMax=3, yMin=-3.3, yMax=3.8
f: Function("x^3/3-x", xMin=-2.4, xMax=2.4)
d: Function("x^2-1", xMin=-2.1, xMax=2.1)
U: FreePoint(0, 0)
V: FreePoint(1, 0)
A: FuncParallelTangent(U -> V, f, index=0)
B: FuncParallelTangent(U -> V, f, index=1)
H: Projection(A onto U -> V)
K: Projection(B onto U -> V)
AH: Segment(A -> H)
BK: Segment(B -> K)
---annotations---
ann_U: Annotation(U, visible=false)
ann_V: Annotation(V, visible=false)
ann_AH: Annotation(AH, visible=true, lineDash=[4,4])
ann_BK: Annotation(BK, visible=true, lineDash=[4,4])
t: Text(x=-1, y=3.3, text="$y=f'(x)$", isLatex=true)
l: Text(x=1.8, y=-2, text="$y=f(x)$", isLatex=true)
