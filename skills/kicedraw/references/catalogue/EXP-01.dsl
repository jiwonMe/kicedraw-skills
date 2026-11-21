# @code: EXP-01
# @title: 지수·로그함수 그래프와 y=x 대칭
# @summary: 역함수 쌍을 점선 y=x 양쪽에 배치한다.
# @widthMm: 60
@version: "1.1.0"
@axes: xMin=-2, xMax=5, yMin=-2, yMax=5
e: Function("2^x", xMin=-2, xMax=2.2)
l: Function("log(x)/log(2)", xMin=0.25, xMax=4.6)
O: FreePoint(0, 0)
U: FreePoint(1, 1)
diag: Line(O -> U)
---annotations---
ann_O: Annotation(O, visible=true, pointSize=0)
ann_U: Annotation(U, visible=true, pointSize=0)
ann_diag: Annotation(diag, visible=true, lineDash=[4,4])
t1: Text(x=0.6, y=4.3, text="$y=2^x$", isLatex=true)
t2: Text(x=4.3, y=1.6, text="$y=\log_2 x$", isLatex=true)
