# @code: EXP-03
# @title: 무리함수와 직선 사이 넓이 (세로 빗금)
# @summary: 제곱근 그래프와 축 사이의 넓이를 수직 경계까지 표시한다.
# @widthMm: 60
@version: "1.1.0"
@axes: xMin=-1, xMax=5, yMin=-1, yMax=3
f: Function("sqrt(x)", xMin=0, xMax=4.5)
A: FreePoint(4, 0)
B: FreePoint(4, 2.6)
s: Segment(A -> B)
---annotations---
ann_A: Annotation(A, visible=true, label="$4$", labelPosition="bottom", pointSize=0)
ann_B: Annotation(B, visible=true, pointSize=0)
fr: FillRegion(seedX=3, seedY=0.5, visible=true, fillColor=0, fillOpacity=1, pattern="hatch", patternAngle=90, patternSpacing=4)
t1: Text(x=2.2, y=2.2, text="$y=\sqrt{x}$", isLatex=true)
