# @widthMm: 140
# 평면 β는 z=0, 두 평면의 교선은 x축. AB=18이므로 a=9.
# FH=8, FQ=12, F'Q=6에서 c=3√3, b=3√6. H=(√3,-4,0), P=(√3,-4,√62).
# α의 반지름 방향 단위벡터는 (0,-4/√78,√62/√78). 직교 카메라 각도는 재현용.
@version: "1.1.0"
@frame: x=-27, y=-19.6, width=50, height=39.2
@const: a=9, b=7.34846922835, co=0.452910813658, si=0.891555828242
# 곡선은 s와 같은 직교 투영 기저를 사용한다. u,v는 수평면의 x,y 단위벡터 투영 성분이다.
# 시점을 바꿀 때는 아래 투영 계수와 곡선 라벨 위치도 함께 조정한다.
@const: ux=0.601815023152, uy=0.292700894138, vx=-0.798635510047, vy=0.220565944246, vz=0.930417567982
O: FreePoint(0,0)
s: Scene3D(origin=O, view="orthographic", azimuth=-143, elevation=21.5, hiddenDash=[7,4])
alphaPlane: Plane(s, at=[-4.5,-0.9058216273,1.7831116565], normal=[0,0.8915558282,0.4529108137], u=[1,0,0], width=35, height=34)
betaPlane: Plane(s, at=[-4.5,0,0], normal=[0,0,1], u=[1,0,0], width=35, height=32)
A: Point3D(s, x=-9, y=0, z=0)
B: Point3D(s, x=9, y=0, z=0)
F: Point3D(s, x=-5.19615242271, y=0, z=0)
Fp: Point3D(s, x=5.19615242271, y=0, z=0)
H: Point3D(s, x=1.73205080757, y=-4, z=0)
P: Point3D(s, x=1.73205080757, y=-4, z=7.87400787401)
Q: Point3D(s, x=5.19615242271, y=-6, z=0)
PH: Segment(P -> H)
FQ: Segment(F -> Q)
# C1: a(cos t, -co sin t, si sin t) in the inclined plane.
c1upper: ParametricCurve("a*(ux*cos(t)-co*vx*sin(t))", "a*(uy*cos(t)+(si*vz-co*vy)*sin(t))", tMin=0, tMax=3.14159265359)
c1lower: ParametricCurve("a*(ux*cos(t)-co*vx*sin(t))", "a*(uy*cos(t)+(si*vz-co*vy)*sin(t))", tMin=3.14159265359, tMax=6.28318530718)
# C2: (a cos t,b sin t,0). The circle of radius 4 about H is tangent to AB.
c2back: ParametricCurve("ux*a*cos(t)+vx*b*sin(t)", "uy*a*cos(t)+vy*b*sin(t)", tMin=0, tMax=3.14159265359)
c2front: ParametricCurve("ux*a*cos(t)+vx*b*sin(t)", "uy*a*cos(t)+vy*b*sin(t)", tMin=3.14159265359, tMax=6.28318530718)
hCircle: ParametricCurve("ux*(sqrt(3)+4*cos(t))+vx*(-4+4*sin(t))", "uy*(sqrt(3)+4*cos(t))+vy*(-4+4*sin(t))", tMin=0, tMax=6.28318530718)
# At the end of the common edge, both transverse rays are perpendicular to AB in space.
W: Point3D(s, x=13, y=0, z=0)
U: Point3D(s, x=13, y=-4, z=0)
V: Point3D(s, x=13, y=-1.81164325463, z=3.56622331297)
---annotations---
hO: Annotation(O, pointSize=0)
hW: Annotation(W, pointSize=0)
hU: Annotation(U, pointSize=0)
hV: Annotation(V, pointSize=0)
hiddenC1: Annotation(c1lower, lineDash=[6,4])
hiddenC2: Annotation(c2back, lineDash=[6,4])
normalStyle: Annotation(PH, lineDash=[5,4])
annA: Annotation(A, label="$\mathrm{A}$", labelPosition="bottom-right", labelDistance=19, pointSize=3)
annB: Annotation(B, label="$\mathrm{B}$", labelPosition="top-right", labelDistance=30, pointSize=3)
annF: Annotation(F, label="$\mathrm{F}$", labelPosition="top", labelDistance=11, pointSize=3)
annFp: Annotation(Fp, label="$\mathrm{F}'$", labelPosition="top-left", pointSize=3)
annP: Annotation(P, label="$\mathrm{P}$", labelPosition="top", pointSize=3)
annH: Annotation(H, label="$\mathrm{H}$", labelPosition="bottom", pointSize=3)
annQ: Annotation(Q, label="$\mathrm{Q}$", labelPosition="right", labelDistance=15, pointSize=3)
angle: AngleAnnotation(U, W, V, visible=true, label="$\theta$", isLatex=true, radius=21, labelOffset=14)
nameAlpha: Text(x=-15.8, y=-14.5, text="$\alpha$", isLatex=true)
nameBeta: Text(x=-20.7, y=-3.2, text="$\beta$", isLatex=true)
nameC1: Text(x=-0.3, y=6.8, text="$C_1$", isLatex=true)
nameC2: Text(x=-8.95, y=-1.5, text="$C_2$", isLatex=true)
