# REP-03 · 구의 중심 O와 수평 단면의 중심 H. 반지름 3.3은 투영 비례를 위한 정규화 값.
# @widthMm: 117
@version: "1.1.0"
@frame: x=-7.50, y=-5.25, width=14, height=9.50
O: FreePoint(0,0)
s: Scene3D(origin=O, view="orthographic", azimuth=-60, elevation=20, hiddenDash=[7,3])
sp: Sphere(s, at=[0,0,0], radius=3.3)
p: Plane(s, at=[0,0,-2.2], normal=[0,0,1], width=9, height=8.8)
post: Line3D(s, from=[2.41447207,0.46938752,-2.98], to=[2.41447207,0.46938752,3.38])
# A,B,C are on the horizontal section circle of radius sqrt(3.3²-2.2²).
H: Point3D(s, x=0, y=0, z=-2.2)
A: Point3D(s, x=0, y=-2.45967478, z=-2.2)
B: ReflectPoint(A about H)
C: Point3D(s, x=2.41447207, y=0.46938752, z=-2.2)
Hup: ReflectPoint(H about O)
D: TranslatePoint(C by H -> Hup)
E: Point3D(s, x=-1.61373755, y=-1.85630038, z=-2.2)
F: Point3D(s, x=-1.22983739, y=2.13014084, z=-2.2)
# Paint boundary only: front/back rim strokes come from the sphere/plane intersection.
rim: Conic5[A,B,C,E,F]
OH: Segment(O -> H)
---annotations---
ann_rim: Annotation(rim, visible=true, opacity=0)
ann_Hup: Annotation(Hup, visible=false)
ann_E: Annotation(E, pointSize=0)
ann_F: Annotation(F, pointSize=0)
ann_O: Annotation(O, label="$\mathrm{O}$", labelPosition="top", pointSize=4)
ann_H: Annotation(H, label="$\mathrm{H}$", labelPosition="left", pointSize=4)
ann_A: Annotation(A, label="$\mathrm{A}$", labelPosition="top-left", labelDistance=18, pointSize=4)
ann_B: Annotation(B, label="$\mathrm{B}$", labelPosition="top", labelDistance=12, pointSize=4)
ann_C: Annotation(C, label="$\mathrm{C}$", labelPosition="bottom-right", pointSize=4)
ann_D: Annotation(D, label="$\mathrm{D}$", labelPosition="left", pointSize=4)
disc: FillRegion(seedX=0, seedY=-2.06, boundaries="rim", fillColor=0, fillOpacity=0.16)
name_s: Text(x=-3.05, y=2.18, text="$S_1$", isLatex=true)
name_c: Text(x=-2.17, y=-1.16, text="$C_1$", isLatex=true)
name_p: Text(x=-5.24, y=-2.47, text="$\alpha$", isLatex=true)
