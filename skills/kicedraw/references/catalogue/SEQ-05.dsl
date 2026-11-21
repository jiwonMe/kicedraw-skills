# @code: SEQ-05
# @title: 동심원에 포함되는 격자점 수열
# @summary: 반지름 1, 2인 두 원판 안의 정수 좌표를 표시하고 누적 개수를 비교한다.
# @widthMm: 60
@version: "1.1.0"
@frame: x=-3, y=-3, width=6, height=6
@axes: xMin=-2.5, xMax=2.5, yMin=-2.5, yMax=2.5
O: FreePoint(0, 0)
c: Circle(center=O, radius=1)
d: Circle(center=O, radius=2)
P0: FreePoint(-2, 0)
P1: FreePoint(-1, -1)
P2: FreePoint(-1, 0)
P3: FreePoint(-1, 1)
P4: FreePoint(0, -2)
P5: FreePoint(0, -1)
P6: FreePoint(0, 1)
P7: FreePoint(0, 2)
P8: FreePoint(1, -1)
P9: FreePoint(1, 0)
P10: FreePoint(1, 1)
P11: FreePoint(2, 0)
---annotations---
