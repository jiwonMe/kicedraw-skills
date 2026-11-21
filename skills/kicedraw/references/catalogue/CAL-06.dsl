# @code: CAL-06
# @title: 절댓값 함수와 축 라벨 변경
# @summary: 절댓값으로 접어 올린 그래프의 뾰족점을 확인한다.
# @widthMm: 60
@version: "1.1.0"
@axes: xMin=-3, xMax=3, yMin=-1, yMax=3, xLabel="t", yLabel="s"
f: Function("abs(x)-1", xMin=-3, xMax=3)
A: Intersect(Axis(x), f, index=0)
B: Intersect(Axis(x), f, index=1)
---annotations---
ann_A: Annotation(A, visible=true, label="$-1$", labelPosition="bottom-left", pointSize=3)
ann_B: Annotation(B, visible=true, label="$1$", labelPosition="bottom-right", pointSize=3)
fr: FillRegion(seedX=0.4, seedY=-0.2, visible=true, fillColor=0, fillOpacity=1, pattern="hatch", patternSpacing=4)
