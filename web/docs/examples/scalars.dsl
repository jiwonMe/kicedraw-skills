@version: "1.1.0"
@let: area = 5
@let: w = 2
@solve: h = root(0, 2*area; w*h/2-area)
@frame: x=-0.7, y=-0.65, width=3.7, height=6.3
A: FreePoint(0,0)
B: FreePoint(${w},0)
C: FreePoint(0,${h})
AB: Segment(A -> B)
BC: Segment(B -> C)
CA: Segment(C -> A)
---annotations---
right: AngleAnnotation(B, A, C, markKind="right", radius=14)
shade: FillRegion(seedX=${w/3}, seedY=${h/3}, boundaries="AB BC CA", fillColor=0, fillOpacity=0.12)
