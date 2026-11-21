# @code: CON-04
# @title: 초점을 중심으로 하는 원과 타원
# @summary: 한 초점에서 거리가 주어진 점을 원과 타원의 두 교점으로 해석한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-6, y=-4, width=10, height=8
F: FreePoint(-2, 0)
G: FreePoint(2, 0)
P: FreePoint(0.6, 2)
e: Ellipse(focus1=F, focus2=G, through=P)
c: Circle(center=F, through=P)
Q: ReflectPoint(P across F -> G)
PF: Segment(P -> F)
FQ: Segment(F -> Q)
QG: Segment(Q -> G)
---annotations---
ann_P: Annotation(P, visible=true, label="$\mathrm{P}$", labelPosition="top-right", labelDistance=32, pointSize=0)
ann_Q: Annotation(Q, visible=true, label="$\mathrm{Q}$", labelPosition="bottom-right", labelDistance=32, pointSize=0)
