# REP-07 · 지문에 f,g의 식은 없다. 원본의 증가·오목성과 점근선 위치에 맞춘 로그함수 모형.
# P는 두 직선의 공통점이다. Q, R의 위치는 g와의 교점으로 결정한다.
# @widthMm: 79
@version: "1.1.0"
@frame: x=-2.3, y=-2.4, width=10.9, height=8.9
@axes: xMin=-1.18, xMax=6.87, yMin=-1.56, yMax=5.62, showLabels=false
f: Function("1.411*log(x-1.1725)+2.008", xMin=1.253, xMax=6.685)
g: Function("1.419*log(x+0.592)+2.29", xMin=-0.524, xMax=6.685)
# 얕은 직선의 y절편은 0.53, 기울기는 -1/6. 원본과 같이 그래프 양 끝에서 자른다.
s: Function("0.53-x/6", xMin=-1.12, xMax=6.685)
P: Intersect(s, f, index=0)
Y: FreePoint(0,3.22)
steep: Line(Y -> P)
Q: Intersect(s,g,index=0)
R: Intersect(steep,g,index=0)
---annotations---
style: Annotation(steep, useGraphRange=true, graphXMin=-1.12, graphXMax=6.685, graphYMin=-1.53, graphYMax=5.43)
ys: Annotation(Y, pointSize=0)
aR: Annotation(R, label="$\mathrm{R}$", labelPosition="right", pointSize=0)
aQ: Annotation(Q, label="$\mathrm{Q}$", labelPosition="top-left", pointSize=0)
aP: Annotation(P, label="$\mathrm{P}$", labelPosition="top-right", pointSize=0)
tx: Text(x=6.78, y=-0.27, text="$x$", isLatex=true)
ty: Text(x=-0.22, y=5.47, text="$y$", isLatex=true)
to: Text(x=0.22, y=-0.27, text="$\mathrm{O}$", isLatex=true)
tg: Text(x=4.3, y=5.14, text="$y=g(x)$", isLatex=true)
tf: Text(x=5.5, y=3.52, text="$y=f(x)$", isLatex=true)
