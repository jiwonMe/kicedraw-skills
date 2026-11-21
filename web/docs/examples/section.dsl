@version: "1.1.0"
@frame: x=-5.3, y=-3.6, width=10.6, height=7.2
O: FreePoint(0,0)
s: Scene3D(origin=O, view="orthographic", azimuth=-60, elevation=25, hiddenDash=[5,3])
ball: Sphere(s, at=[0,0,0], radius=2.4)
p: Plane(s, at=[0,0,-1.2], normal=[0,0,1], width=6.3, height=5.8)
H: Point3D(s, x=0, y=0, z=-1.2)
OH: Segment(O -> H)
---annotations---
aO: Annotation(O, label="$\mathrm{O}$", labelPosition="left", labelDistance=18, pointSize=4)
aH: Annotation(H, label="$\mathrm{H}$", labelPosition="bottom-right", pointSize=4)
height: Annotation(OH, lineDash=[4,3])
