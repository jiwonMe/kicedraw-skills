# @widthMm: 68
# AD=h이면 ED=h/4. AC²−EC²=20−5=(15/16)h²이므로 AD=4, BD=3, DC=2.
@version: "1.1.0"
@frame: x=-0.68, y=-0.55, width=6.45, height=5.12
B: FreePoint(0,0)
C: VectorOffset(B, ux=1, uy=0, offset=5)
A: VectorOffset(B, ux=3, uy=4, offset=5)
D: Projection(A onto B -> C)
E: Division(A, D, m=3, n=1, kind=internal)
BA: Segment(B -> A)
AC: Segment(A -> C)
BC: Segment(B -> C)
AD: Segment(A -> D)
EC: Segment(E -> C)
---annotations---
a: Annotation(A, label="$\mathrm{A}$", labelPosition="top", pointSize=0)
b: Annotation(B, label="$\mathrm{B}$", labelPosition="left", pointSize=0)
c: Annotation(C, label="$\mathrm{C}$", labelPosition="right", pointSize=0)
d: Annotation(D, label="$\mathrm{D}$", labelPosition="bottom", pointSize=0)
e: Annotation(E, label="$\mathrm{E}$", labelPosition="left", pointSize=0)
lenBA: Annotation(BA, label="$5$", labelAnchor="middle", labelSide="left", labelOffset=42)
lenAC: Annotation(AC, label="$2\sqrt{5}$", labelAnchor="middle", labelSide="left", labelOffset=72)
lenEC: Annotation(EC, label="$\sqrt{5}$", labelAnchor="middle", labelSide="left", labelOffset=40)
rightD: AngleAnnotation(C, D, A, markKind="right", radius=16)
alphaB: AngleAnnotation(D, B, A, label="$\alpha$", isLatex=true, radius=23, labelOffset=17)
betaC: AngleAnnotation(E, C, D, label="$\beta$", isLatex=true, radius=33, labelOffset=58)
