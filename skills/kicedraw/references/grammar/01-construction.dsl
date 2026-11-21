# 중선과 중점: 주 도형은 실선, 보조선만 점선
@version: "1.1.0"
@frame: x=-1, y=-1, width=7, height=5
A: FreePoint(0, 0)
B: FreePoint(5, 0)
C: FreePoint(1.4, 3)
M: MidPoint(A, B)
s1: Segment(A -> B)
s2: Segment(B -> C)
s3: Segment(C -> A)
median: Segment(C -> M)
---annotations---
ann_M: Annotation(M, visible=true, label="$\mathrm{M}$", labelPosition="bottom", pointSize=0)
ann_m: Annotation(median, visible=true, lineDash=[4,4])
