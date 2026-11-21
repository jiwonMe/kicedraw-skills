# @code: SEQ-01
# @title: 자연수 정의역의 수열
# @summary: 함수 위의 자연수 입력만 점으로 남겨 연속 그래프와 수열을 구분한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-1, y=-1, width=7, height=6
@axes: xMin=-0.5, xMax=5.6, yMin=-0.5, yMax=4.5
f: Function("1+x/2", xMin=0, xMax=6)
P1: PointOnPath(f, t=0.16666667)
P2: PointOnPath(f, t=0.33333333)
P3: PointOnPath(f, t=0.5)
P4: PointOnPath(f, t=0.66666667)
P5: PointOnPath(f, t=0.83333333)
---annotations---
ann_f: Annotation(f, visible=false)
ann_P1: Annotation(P1, visible=true, pointSize=4)
ann_P2: Annotation(P2, visible=true, pointSize=4)
ann_P3: Annotation(P3, visible=true, pointSize=4)
ann_P4: Annotation(P4, visible=true, pointSize=4)
ann_P5: Annotation(P5, visible=true, pointSize=4)
