# @code: CON-03
# @title: 쌍곡선의 점근선과 두 접선
# @summary: 보조 직사각형 꼭짓점으로 점근선을 정하고 외부점에서 두 접점을 구한다.
# @widthMm: 80
@version: "1.1.0"
@frame: x=-8, y=-6, width=16, height=12
F1:FreePoint(-5, 0)
F2: FreePoint(5, 0)
V: FreePoint(3, 0)
h: Hyperbola(focus1=F1, focus2=F2, through=V)
a0: AsymptotePoint(h, index=0)
a1: AsymptotePoint(h, index=1)
a2: AsymptotePoint(h, index=2)
a3: AsymptotePoint(h, index=3)
asym1: Line(a0 -> a2)
asym2: Line(a1 -> a3)
P: FreePoint(2, 0.5)
T1: ConicTangent(P, h, index=0)
T2: ConicTangent(P, h, index=1)
PT1: Segment(P -> T1)
PT2: Segment(P -> T2)
---annotations---
ann_asym1: Annotation(asym1, visible=true, lineDash=[4,4])
ann_asym2: Annotation(asym2, visible=true, lineDash=[4,4])
ann_a0: Annotation(a0, visible=false)
ann_a1: Annotation(a1, visible=false)
ann_a2: Annotation(a2, visible=false)
ann_a3: Annotation(a3, visible=false)
ann_F1: Annotation(F1, visible=false)
ann_F2: Annotation(F2, visible=false)
ann_V: Annotation(V, visible=false)
ann_P: Annotation(P, visible=true, pointSize=3)
