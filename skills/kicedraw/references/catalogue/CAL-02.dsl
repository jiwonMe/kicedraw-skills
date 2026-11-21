# @code: CAL-02
# @title: 구간별 함수: 열린 점과 닫힌 점
# @summary: 구간 경계에서 같은 x에 열린 점과 닫힌 점을 구분한다.
# @widthMm: 60
@version: "1.1.0"
@axes: xMin=-2, xMax=4, yMin=-2, yMax=4
f1: Function("x+1", xMin=-2, xMax=1)
f2: Function("2-x", xMin=1, xMax=4)
P: FreePoint(1, 2)
Q: FreePoint(1, 1)
---annotations---
ann_P: Annotation(P, visible=true, pointShape="hollow", pointSize=4)
ann_Q: Annotation(Q, visible=true, pointSize=4)
t1: Text(x=3.2, y=1.3, text="$y=f(x)$", isLatex=true)
