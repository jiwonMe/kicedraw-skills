# @code: CAL-01
# @title: 포물선과 x축 사이 넓이 (정적분 빗금)
# @summary: 포물선과 축을 경계로 잡고 수직선까지의 정적분을 표시한다.
# @widthMm: 60
@version: "1.1.0"
@axes: xMin=-1, xMax=4, yMin=-1, yMax=5
f: Function("x^2", xMin=-1, xMax=2.2)
A: FreePoint(2, 0)
B: FreePoint(2, 4.5)
s: Segment(A -> B)
---annotations---
ann_A: Annotation(A, visible=true, label="$2$", labelPosition="bottom", pointSize=0)
fr: FillRegion(seedX=1.5, seedY=0.5, visible=true, fillColor=0, fillOpacity=1, pattern="hatch")
t1: Text(x=1, y=4, text="$y=x^2$", isLatex=true, visible=true)
