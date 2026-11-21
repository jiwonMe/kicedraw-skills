# @code: TRI-06
# @title: 삼각형의 내접원과 외접원
# @summary: 세 꼭짓점을 지나는 원과 세 변에 접하는 원을 한 도형에서 구분한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-1.5, y=-2.4, width=8.5, height=8.5
A: FreePoint(0, 0)
B: FreePoint(5, 0)
C: FreePoint(1.8, 3.1)
AB: Segment(A -> B)
BC: Segment(B -> C)
CA: Segment(C -> A)
out: Circumcircle[A, B, C]
ins: Incircle[A -> B, B -> C, C -> A]
---annotations---
ann_C: Annotation(C, visible=true, label="$\mathrm{C}$", labelPosition="top", pointSize=0)
