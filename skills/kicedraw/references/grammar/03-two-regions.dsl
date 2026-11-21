# 직사각형을 대각선으로 나눈 두 영역: 회색과 빗금
@version: "1.1.0"
@frame: x=-1, y=-1, width=7, height=5
A: FreePoint(0, 0)
B: FreePoint(5, 0)
D: FreePoint(0, 3)
C: TranslatePoint(B by A -> D)
AB: Segment(A -> B)
BC: Segment(B -> C)
CD: Segment(C -> D)
DA: Segment(D -> A)
AC: Segment(A -> C)
---annotations---
lo: FillRegion(seedX=3, seedY=1, visible=true, fillColor=0, fillOpacity=0.18)
hi: FillRegion(seedX=1, seedY=2, visible=true, fillColor=0, fillOpacity=1, pattern="hatch")
