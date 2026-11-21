# @widthMm: 140
# β: z=0. 주어진 지름, 접원의 반지름, F에서의 각. 시점과 평면의 표시 크기는 작도 설정이다.
@version: "1.1.0"
@frame: x=-27, y=-19.6, width=50, height=39.2
@let: diameter = 18
@let: r = 4
@let: phi = pi/6
@let: a = diameter/2
# H에서 AB까지의 거리는 r. F,H,Q 순서이므로 FQ=FH+HQ.
@let: fh = r/sin(phi)
@let: fq = fh+r
@let: farQ = diameter-fq
@let: qy = -fq*sin(phi)
# F'Q=farQ, y방향 거리는 |qy|. Q가 F' 아래에 오는 원본 배치를 택한다.
# 두 초점 간 거리 2c를 미지수로 두고 F'Q의 거리식을 푼다.
@solve: c = root(fq*cos(phi)/2, a; hypot(2*c-fq*cos(phi),qy)-farQ)
@let: b = sqrt(a^2-c^2)
@let: hx = -c+fh*cos(phi)
@let: qx = -c+fq*cos(phi)
# P는 반지름 a인 원 위, H는 P의 수선의 발. co=cos(이면각)의 양의 해를 구한다.
@solve: co = root(r/a, 1; hx^2+(r/co)^2-a^2)
@let: si = sqrt(1-co^2)
@let: pz = r*si/co
# 카메라와 세 곡선이 공유하는 직교 투영 기저(z-up).
@let: az = -143
@let: el = 21.5
@let: azRad = az*pi/180
@let: elRad = el*pi/180
@let: ux = -sin(azRad)
@let: vx = cos(azRad)
@let: uy = -cos(azRad)*sin(elRad)
@let: vy = -sin(azRad)*sin(elRad)
@let: vz = cos(elRad)
@let: halfWidth = 17.5
@let: shiftX = -a/2
@let: mark = r
O: FreePoint(0,0)
s: Scene3D(origin=O, view="orthographic", azimuth=${az}, elevation=${el}, hiddenDash=[7,4])
alphaPlane: Plane(s, at=[${shiftX},${-2*co},${2*si}], normal=[0,${si},${co}], u=[1,0,0], width=${2*halfWidth}, height=34)
betaPlane: Plane(s, at=[${shiftX},0,0], normal=[0,0,1], u=[1,0,0], width=${2*halfWidth}, height=32)
A: Point3D(s, x=${-a}, y=0, z=0)
B: Point3D(s, x=${a}, y=0, z=0)
F: Point3D(s, x=${-c}, y=0, z=0)
Fp: Point3D(s, x=${c}, y=0, z=0)
H: Point3D(s, x=${hx}, y=${-r}, z=0)
P: Point3D(s, x=${hx}, y=${-r}, z=${pz})
Q: Point3D(s, x=${qx}, y=${qy}, z=0)
PH: Segment(P -> H)
FQ: Segment(F -> Q)
# C1: (a cos t, −a co sin t, a si sin t). C2: (a cos t, b sin t, 0).
c1upper: ParametricCurve("${a}*(${ux}*cos(t)-${co*vx}*sin(t))", "${a}*(${uy}*cos(t)+${si*vz-co*vy}*sin(t))", tMin=0, tMax=${pi})
c1lower: ParametricCurve("${a}*(${ux}*cos(t)-${co*vx}*sin(t))", "${a}*(${uy}*cos(t)+${si*vz-co*vy}*sin(t))", tMin=${pi}, tMax=${2*pi})
c2back: ParametricCurve("${ux*a}*cos(t)+${vx*b}*sin(t)", "${uy*a}*cos(t)+${vy*b}*sin(t)", tMin=0, tMax=${pi})
c2front: ParametricCurve("${ux*a}*cos(t)+${vx*b}*sin(t)", "${uy*a}*cos(t)+${vy*b}*sin(t)", tMin=${pi}, tMax=${2*pi})
hCircle: ParametricCurve("${ux*hx-vx*r}+${ux*r}*cos(t)+${vx*r}*sin(t)", "${uy*hx-vy*r}+${uy*r}*cos(t)+${vy*r}*sin(t)", tMin=0, tMax=${2*pi})
W: Point3D(s, x=${shiftX+halfWidth}, y=0, z=0)
U: Point3D(s, x=${shiftX+halfWidth}, y=${-mark}, z=0)
V: Point3D(s, x=${shiftX+halfWidth}, y=${-mark*co}, z=${mark*si})
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
