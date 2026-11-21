# @widthMm: 68
# 발문 없는 그림 재현용 대표값 a=2, k=4. 화면에는 원본의 기호 a,k를 그대로 표시한다.
@version: "1.1.0"
@frame: x=-5.05, y=-3.05, width=15.8, height=13.25
@axes: xMin=-3, xMax=9, yMin=-1.9, yMax=9.95, showLabels=false
@const: a=2
f: Function("2^(x-1)+1", xMin=-3, xMax=4.155)
g: Function("log(x-a)/log(2)", xMin=2.26, xMax=9)
K: FreePoint(4,0)
O: Intersect(Axis(x), Axis(y), index=0)
kTop: VectorOffset(K, ux=0, uy=1, offset=9.95)
kBottom: VectorOffset(K, ux=0, uy=-1, offset=1.9)
kLine: Segment(kBottom -> kTop)
A: Intersect(kLine, f, index=0)
B: Intersect(kLine, g, index=0)
h: Function("5-x", xMin=-3, xMax=6.9)
C: Intersect(h, f, index=0)
D: Intersect(Axis(x), g, index=0)
AC: Segment(A -> C)
CD: Segment(C -> D)
DB: Segment(D -> B)
---annotations---
ann_top: Annotation(kTop, pointSize=0)
ann_bottom: Annotation(kBottom, pointSize=0)
ann_K: Annotation(K, pointSize=0)
ann_O: Annotation(O, label="$\mathrm{O}$", labelPosition="bottom-left", pointSize=0)
ann_A: Annotation(A, label="$\mathrm{A}$", labelPosition="right", pointSize=0)
ann_B: Annotation(B, label="$\mathrm{B}$", labelPosition="right", labelDistance=28, pointSize=0)
ann_C: Annotation(C, label="$\mathrm{C}$", labelPosition="left", pointSize=0)
ann_D: Annotation(D, label="$\mathrm{D}$", labelPosition="bottom-right", pointSize=0)
upper: FillRegion(seedX=3.4, seedY=4.7, boundaries="AC kLine h", fillColor=0, fillOpacity=0.1)
lower: FillRegion(seedX=3.1, seedY=1, boundaries="CD DB h", fillColor=0, fillOpacity=0.1)
tf: Text(x=-2.55, y=1.86, text="$y=2^{x-1}+1$", isLatex=true)
tg: Text(x=7.7, y=3.45, text="$y=\log_{2}(x-a)$", isLatex=true)
tk: Text(x=4, y=-2.47, text="$x=k$", isLatex=true)
tx: Text(x=8.85, y=-0.42, text="$x$", isLatex=true)
ty: Text(x=-0.43, y=9.83, text="$y$", isLatex=true)
