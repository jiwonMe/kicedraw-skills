# @widthMm: 80
# 2012학년도 수능 27번 도면. AB=2이며 θ=26.25°는 구도 재현용 대표값이다.
@version: "1.1.0"
@frame: x=-1.20, y=-0.20, width=2.42, height=1.34
A: FreePoint(-1,0)
B: FreePoint(1,0)
O: MidPoint(A,B)
# ∠PAQ는 같은 호 BP를 보는 중심각 BOP의 절반이다.
P: RotatePoint(B about O, angle=52.5)
Q: Projection(P onto A -> B)
R: Projection(Q onto O -> P)
S: Projection(O onto A -> P)
# 원본처럼 지름의 양 끝에서 원호를 조금 더 연장한다.
rightEnd: RotatePoint(B about O, angle=-7)
leftEnd: RotatePoint(A about O, angle=7)
rim: Arc(center=O, start=rightEnd, end=leftEnd, direction=ccw)
AB: Segment(A -> B)
AP: Segment(A -> P)
OP: Segment(O -> P)
PQ: Segment(P -> Q)
QR: Segment(Q -> R)
OS: Segment(O -> S)
---annotations---
end1: Annotation(rightEnd, pointSize=0)
end2: Annotation(leftEnd, pointSize=0)
a: Annotation(A, label="$\mathrm{A}$", labelPosition="left", pointSize=0)
b: Annotation(B, label="$\mathrm{B}$", labelPosition="right", pointSize=0)
o: Annotation(O, label="$\mathrm{O}$", labelPosition="bottom", pointSize=0)
p: Annotation(P, label="$\mathrm{P}$", labelPosition="top-right", pointSize=0)
q: Annotation(Q, label="$\mathrm{Q}$", labelPosition="bottom", pointSize=0)
r: Annotation(R, label="$\mathrm{R}$", labelPosition="left", labelDistance=16, pointSize=0)
s: Annotation(S, label="$\mathrm{S}$", labelPosition="top-left", pointSize=0)
angleA: AngleAnnotation(Q, A, P, label="$\theta$", isLatex=true, radius=29, labelOffset=32)
rightQ: AngleAnnotation(B, Q, P, markKind="right", radius=17)
rightR: AngleAnnotation(Q, R, P, markKind="right", radius=17)
rightS: AngleAnnotation(A, S, O, markKind="right", radius=17)
f: FillRegion(seedX=-0.40, seedY=0.12, boundaries="AB AP OS", fillColor=0, fillOpacity=0.14)
g: FillRegion(seedX=0.48, seedY=0.34, boundaries="OP PQ QR", fillColor=0, fillOpacity=0.14)
