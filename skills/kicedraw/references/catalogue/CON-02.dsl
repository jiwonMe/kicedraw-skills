# @code: CON-02
# @title: 두 초점과 타원 위의 삼각형
# @summary: 타원 위의 점이 움직여도 두 초점까지 거리의 합이 일정하다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-4, y=-3, width=8, height=6
F: FreePoint(-2, 0)
G: FreePoint(2, 0)
P: FreePoint(0.6, 2)
e: Ellipse(focus1=F, focus2=G, through=P)
FP: Segment(F -> P)
PG: Segment(P -> G)
GF: Segment(G -> F)
---annotations---
ann_P: Annotation(P, visible=true, label="$\mathrm{P}$", labelPosition="top", pointSize=0)
ann_F: Annotation(F, visible=true, label="$\mathrm{F}$", labelPosition="bottom", pointSize=0)
ann_G: Annotation(G, visible=true, label="$\mathrm{G}$", labelPosition="bottom", pointSize=0)
