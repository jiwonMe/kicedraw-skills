# @code: EXP-02
# @title: 유리함수와 점근선 (점선)
# @summary: 정의역을 두 갈래로 나누고 수평·수직 점근선을 점선으로 표시한다.
# @widthMm: 60
@version: "1.1.0"
@axes: xMin=-4, xMax=6, yMin=-4, yMax=6
f1: Function("1/(x-1)+2", xMin=-4, xMax=0.8)
f2: Function("1/(x-1)+2", xMin=1.2, xMax=6)
V1: FreePoint(1, -4)
V2: FreePoint(1, 6)
H1: FreePoint(-4, 2)
H2: FreePoint(6, 2)
va: Segment(V1 -> V2)
ha: Segment(H1 -> H2)
---annotations---
ann_V1: Annotation(V1, visible=true, pointSize=0)
ann_V2: Annotation(V2, visible=true, pointSize=0)
ann_H1: Annotation(H1, visible=true, pointSize=0)
ann_H2: Annotation(H2, visible=true, pointSize=0)
ann_va: Annotation(va, visible=true, lineDash=[4,4])
ann_ha: Annotation(ha, visible=true, lineDash=[4,4])
t1: Text(x=2.3, y=-0.7, text="$x=1$", isLatex=true)
t2: Text(x=4.8, y=1.3, text="$y=2$", isLatex=true)
