# @widthMm: 104
# 주어진 절단면 x=2. mid는 예시 중간 단면, endX는 그래프 표시 범위.
# ax,ay,bx,by,hz는 도면의 사투영·높이 비율이지 교점 좌표가 아니다.
@version: "1.1.0"
@frame: x=-2.13, y=-1.97, width=14, height=10
@let: cut = 2
@let: mid = 0.93
@let: endX = 3.14
@let: ax = 1.23
@let: ay = -0.15
@let: bx = 0.44
@let: by = 0.39
@let: hz = 1.065
# 중간 삼각형의 무게중심: 세 꼭짓점 좌표 평균을 채움 시드로 쓴다.
@let: fMid = sqrt((2*mid+1)*exp(mid)+sin(pi*mid))
@let: sx = ax*mid+bx*fMid/2
@let: sy = ay*mid+(by/2+hz/3)*fMid
floorCurve: ParametricCurve("${ax}*t+${bx}*sqrt((2*t+1)*exp(t)+sin(pi*t))", "${ay}*t+${by}*sqrt((2*t+1)*exp(t)+sin(pi*t))", tMin=0, tMax=${endX})
ridge: ParametricCurve("${ax}*t+${bx/2}*sqrt((2*t+1)*exp(t)+sin(pi*t))", "${ay}*t+${by/2+hz}*sqrt((2*t+1)*exp(t)+sin(pi*t))", tMin=0, tMax=${cut})
A: FreePoint(0,0)
X: FreePoint(${ax},${ay})
Y: FreePoint(${bx},${by})
x0: DilatePoint(X about A, factor=-0.48)
x1: DilatePoint(X about A, factor=3.1)
xaxis: Vector(x0 -> x1)
y0: DilatePoint(Y about A, factor=-1.15)
y1: DilatePoint(Y about A, factor=12.9)
yaxis: Vector(y0 -> y1)
AF: PointOnPath(floorCurve, t=0)
AT: PointOnPath(ridge, t=0)
AAT: Segment(A -> AT)
ATAF: Segment(AT -> AF)
AAF: Segment(A -> AF)
B: DilatePoint(X about A, factor=${mid})
BF: PointOnPath(floorCurve, t=${mid/endX})
BT: PointOnPath(ridge, t=${mid/cut})
BBT: Segment(B -> BT)
BTBF: Segment(BT -> BF)
BBF: Segment(B -> BF)
C: DilatePoint(X about A, factor=${cut})
CF: PointOnPath(floorCurve, t=${cut/endX})
CT: PointOnPath(ridge, t=1)
CCT: Segment(C -> CT)
CTCF: Segment(CT -> CF)
CCF: Segment(C -> CF)
N: DilatePoint(CF about C, factor=-0.14)
Z: DilatePoint(C about CF, factor=-1.475)
NC: Segment(N -> C)
CFZ: Segment(CF -> Z)
---annotations---
hX: Annotation(X, visible=false)
hY: Annotation(Y, visible=false)
ann_AAT: Annotation(AAT, lineWidth=2.6)
ann_ATAF: Annotation(ATAF, lineDash=[4,3], lineWidth=1.4)
ann_AAF: Annotation(AAF, lineWidth=2.6)
ann_BBT: Annotation(BBT, lineWidth=2.6)
ann_BTBF: Annotation(BTBF, lineWidth=2.6)
ann_BBF: Annotation(BBF, lineWidth=2.6)
ann_CCT: Annotation(CCT, lineWidth=2.6)
ann_CTCF: Annotation(CTCF, lineWidth=2.6)
ann_CCF: Annotation(CCF, lineWidth=2.6)
ann_xaxis: Annotation(xaxis, lineWidth=1.2)
ann_yaxis: Annotation(yaxis, lineWidth=1.2)
t_eq: Text(x=9.05, y=2.63, fontSize=15, text="$y=\sqrt{(2x+1)e^x+\sin{\pi x}}$", isLatex=true)
t_x: Text(x=3.65, y=-0.68, text="$x$", isLatex=true)
t_y: Text(x=5.38, y=5.22, text="$y$", isLatex=true)
t_o: Text(x=0.10, y=-0.31, text="$\mathrm{O}$", isLatex=true)
t_cut: Text(x=2.1, y=-0.87, text="$x=${cut}$", isLatex=true)
surface: FillRegion(seedX=${sx}, seedY=${sy}, boundaries="AAT ridge CTCF CCF xaxis", fillColor=0, fillOpacity=0.16)
section: FillRegion(seedX=${sx}, seedY=${sy}, boundaries="BBT BTBF BBF", fillColor=0, fillOpacity=0.3)
