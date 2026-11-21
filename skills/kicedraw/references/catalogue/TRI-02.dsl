# @code: TRI-02
# @title: 원과 현으로 둘러싸인 활꼴 (회색 음영)
# @summary: 원 위 두 점을 잇는 현 위쪽의 활꼴만 채운다.
# @widthMm: 60
@version: "1.1.0"
O: FreePoint(0, 0)
R: FreePoint(3, 0)
c: Circle(center=O, through=R)
P: ArcEnd(center=O, radiusPoint=R, angle=1.0471975512)
Q: ArcEnd(center=O, radiusPoint=R, angle=2.0943951024)
PQ: Segment(P -> Q)
---annotations---
ann_O: Annotation(O, visible=true, label="$\mathrm{O}$", labelPosition="bottom", pointSize=2)
ann_R: Annotation(R, visible=true, pointSize=0)
ann_P: Annotation(P, visible=true, label="$\mathrm{P}$", labelPosition="top-right", pointSize=2)
ann_Q: Annotation(Q, visible=true, label="$\mathrm{Q}$", labelPosition="top-left", pointSize=2)
fr: FillRegion(seedX=0, seedY=2.8, visible=true, fillColor=0, fillOpacity=0.25)
