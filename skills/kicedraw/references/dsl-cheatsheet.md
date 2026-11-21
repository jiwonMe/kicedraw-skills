# ClassGeo DSL Cheatsheet (LLM)

Coords: math/cartesian. x right+, y up+. (0,0)=viewport center. Never flip y for screen pixels.
@frame: x,y = left-bottom corner; width/height > 0. Example coords in docs are illustrative scale.
If geometry falls outside current @frame: (A) scale coordinates OR (B) expand @frame.
Safe default for width=50,height=50: keep primary geometry roughly in x,y ∈ [-25,25].

## File skeleton
@version: "1.0.0"
@created: "<ISO8601>"
@modified: "<ISO8601>"
@mathRenderer: "mathjax"  # optional offline local typesetter. Default "upmath": uncached TeX is sent to https://i.upmath.me. Plain text is never sent.
@frame: x=<n>, y=<n>, width=<n>, height=<n>
# optional: @viewport / @tool (UI state; omit unless editing existing file that has them)
<object declarations>
---constraints---   # optional section between objects and annotations
<constraint lines>
---annotations---
<annotation lines>

Rare macros (@template / @call / {{param}} / {{expr}}): only if user explicitly needs recursion/tiling; otherwise avoid and use ordinary objects. Full details live in MCP full spec.

## Points (dependent points must NOT be FreePoint)
FreePoint(x, y)
  Independent movable point. Only for true free vertices / given coordinates.
MidPoint(pointA, pointB)
  Exact midpoint of A and B.
PointOnPath(pathId, t=<0~1>)
  Point on Segment/curve; t=0 start, t=1 end, t=0.5 midpoint-like.
Projection(point onto lineP1 -> lineP2)
  Foot of perpendicular from point to line through lineP1-lineP2.
Intersect(source1, source2, index=<0|1|...>)
  Intersection of two path-like sources. Use index for multiple hits.
  Prefer Line/Ray (or long Segment) if the intersection may fall outside a short Segment.
  A finite segment must be declared FIRST: s: Segment(A -> B), then P: Intersect(s, c, index=0).
  Inline Segment(...) is NOT an intersection source. Do not substitute an infinite Line unless intended.
  Other sources may be IDs or supported inline constructors (Line(...), Circle(...), Function(...), etc.).
ArcEnd(center=<O>, radiusPoint=<R>, angle=<rad>)
  Point on circle of center O through R, rotated by angle radians.
ClosestPointOnPath(sourcePointId on pathId)
  Closest point on path to sourcePoint.
DirectionalOffset(basePoint, dirP1 -> dirP2, offset=<n>)
  Offset basePoint along direction dirP1->dirP2 by offset (negative reverses).
VectorOffset(basePointId, ux=<n>, uy=<n>, offset=<n>)
  Offset along fixed vector (ux,uy) by offset.
PathTangentOffset(basePointId, closestPointId on pathId, offset=<n>)
  Offset parallel to path tangent at closestPoint.
ReflectPoint(sourcePoint about centerPoint)
ReflectPoint(sourcePoint across axisP1 -> axisP2)
  Point symmetry about a center / line symmetry across axis line.

## Lines / polygons
Segment(start -> end)
  Finite segment. Arrowheads via Annotation on endpoints, not Segment itself.
Line(point1 -> point2)
  Infinite line both ways. Prefer when intersections/extensions matter.
Ray(origin -> through)
  Half-infinite from origin through through-point.
AngleBisector(pointA, vertex, pointB, kind=<internal|external>)
  Angle bisector line at vertex for angle A-vertex-B.
ParallelLine(throughPoint, baseP1 -> baseP2)
  Line through throughPoint parallel to baseP1->baseP2.
PerpendicularLine(throughPoint, baseP1 -> baseP2)
  Line through throughPoint perpendicular to baseP1->baseP2.
Polygon(vertex1 -> vertex2 -> vertex3 -> ...)
  Closed polygon through vertices (min 3).

## Circles / arcs / ellipses
Circle(center=<O>, radius=<r>)
  Center + numeric radius.
Circle(center=<O>, through=<A>)
  Center + point on circle (radius = |OA|). Prefer for relational constructions.
Circumcircle[point1, point2, point3]
  Unique circle through three non-collinear points.
Incircle[line1p1 -> line1p2, line2p1 -> line2p2, line3p1 -> line3p2]
  Incircle from three supporting lines (triangle sides as lines).
Arc(center=<O>, start=<A>, end=<B>, direction=<ccw|cw>)
  Circular arc from A to B about O.
Ellipse(focus1=<F1>, focus2=<F2>, through=<P>)
  Ellipse by two foci and a point on it.
Ellipse(center=<O>, major=<A>, minor=<B>)
  Ellipse by center + major/minor axis points.
Conic5[point1, point2, point3, point4, point5]
  Conic through five points (rare).
ReflectCurve(sourcePathId about centerPoint, samples=<n, default 200>)
ReflectCurve(sourcePathId across axisP1 -> axisP2, samples=<n>)
  Mirror image of any path (graph, circle, ...), sampled as a polyline.

## Division / triangle centers / transforms (dependent — never FreePoint with computed coords)
Division(A, B, m=<n>, n=<n>, kind=<internal|external>)
  Point P with AP:PB = m:n (default internal; external needs m != n).
Centroid(A, B, C) / Orthocenter(A, B, C)
  Triangle centroid / orthocenter. (circumcenter = Circumcircle id_center)
RotatePoint(P about O, angle=<deg>)   # ccw positive
TranslatePoint(P by U -> V)           # by vector U->V
DilatePoint(P about O, factor=<k>)
  Transformed points; rebuild Segment/Circle from transformed vertices.
RotateCurve / TranslateCurve / DilateCurve(f ..., samples=200)
  Same for graphs (sampled polyline), like ReflectCurve.
Regular n-gon on side AB: V(k+1)=RotatePoint(V(k-1) about V(k), angle=-(180-360/n)), then Segments.
Sector OAB: B=RotatePoint(A about O, angle=<deg>), Arc(center=O, start=A, end=B), Segment(O->A), Segment(O->B).
## Geometry course (기하): hyperbola / tangents / vectors / solids
Hyperbola(focus1=<F1>, focus2=<F2>, through=<P>)
  Both branches. Intersect(h, Line(...)) works. P must not lie on the foci bisector or outer foci line.
AsymptotePoint(<hyperbolaId>, index=<0..3>)
  Auxiliary-rectangle corners; asymptotes are Line(a0 -> a2) and Line(a1 -> a3), style lineDash=[6,4].
ConicTangent(<externalPoint>, <ellipseOrHyperbolaId>, index=<0|1>)
  Tangency point from an external point to Ellipse/Hyperbola/Conic5. Then Segment(P -> T).
Vector(<start> -> <end>)
  Segment with an arrowhead at end. Use instead of Segment+arrow point.
s: Scene3D(origin=O, view="orthographic", azimuth=-60, elevation=20)
sp: Sphere(s, at=[0,0,0], radius=3.3)
p: Plane(s, at=[0,0,-2.2], normal=[0,0,1], width=9, height=8.8)
  Declare the scene first; first argument of each member is its scene ID. Also Box(s, at=..., size=...), Cylinder(s, at=..., axis=..., height=..., radius=...), Line3D(s, from=..., to=...).
  Prefer ONE scene for interacting solids. Positions are local world [x,y,z] (z up); origin is a 2D anchor. Sphere, plane, box (at,size), cylinder (base at,axis,height,radius), line (from,to); IDs unique within scene. All share one orthographic HLR camera. Angles in degrees: azimuth from +x towards +y, elevation above xy (-90..90); defaults -60 and 20. At elevation=90 look straight down. Legacy view="isometric" is fixed and takes no angles. showHidden=false omits occluded portions.
Legacy cabinet projection: SpherePlane(center=<pointId>, radius=<positive>, z=<height relative to center>, width=<positive>, depth=<positive>)
  Finite horizontal cutting plane and sphere in cabinet projection; outline, section and hidden spans are derived. Optional showHidden=false or hiddenDash=[4,3]. Do not precompute cut points or angles.
Point3D(<originPoint>, x=<n>, y=<n>, z=<n>)
  Fixed cabinet projection (x right, z up, y depth at 45°, half length). Dragging moves the whole solid.
  Hidden edges: Annotation(edge, lineDash=[4,3]). No 3D rotation/perspective.

## Graphs / function objects
Function("<expr>", xMin=<n>, xMax=<n>)
FunctionGraph("<expr>", xMin=<n>, xMax=<n>)  # alias of Function
  Optional startMark/endMark="open"|"closed"|"none": ○/● endpoint at xMin/xMax.
  Piecewise f: one Function per interval, mark each boundary (x<1 → endMark="open").
  Expr: x, e, pi, exp, ln, log10, abs, sqrt...; other names are @const constants.
ParametricCurve("<x(t)>", "<y(t)>", tMin=<n>, tMax=<n>)  # alias Parametric(...); usable in Intersect/fill
  expr in x, e.g. "x^2", "sin(x)".
Quadratic[point1, point2, point3]
  Unique quadratic through three points.
QuadraticFD(focus=<F>, directrix=<D1> -> <D2>)
  Parabola from focus + directrix line.
Polynomial[point1, point2, ...]
  Interpolating polynomial through >=2 points.

## Tangents
Tangent(externalPoint, Circle(...), index=<0|1>)
  Tangency point from external point to a circle.
ParallelTangent(lineP1 -> lineP2, Circle(...), index=<0|1>)
  Tangency point where tangent is parallel to given line.
TangentLine(pathPointId on pathId, offset=<n>)
  Point used to build a tangent-like offset construction on a path.
QuadTangent(externalPoint, quadGraphId, index=<0|1>)
QuadParallelTangent(lineP1 -> lineP2, quadGraphId)
QuadFDTangent(externalPoint, QuadraticFD(...), index=<0|1>)
QuadFDParallelTangent(lineP1 -> lineP2, QuadraticFD(focus=<F>, directrix=<D1> -> <D2>))
PolyTangent(externalPoint, Polynomial[...], index=<int>)
PolyParallelTangent(lineP1 -> lineP2, Polynomial[...], index=<int>)
FuncTangent(externalPoint, functionGraphId, index=<int>)
FuncParallelTangent(lineP1 -> lineP2, functionGraphId, index=<int>)
  Function(...) graph tangency points, searched inside the graph domain (max 20).

## Constraints (---constraints---)
Use only when a constructor cannot express the relation.
EqualLength(pointA, pointB, pointC, pointD)           # |AB|=|CD|
RatioLength(pointA, pointB, pointC, pointD, n=N, m=M) # |AB|:|CD| = N:M
RatioLength(pointA, pointB, pointC, pointD, r=R)      # |AB|/|CD| = R
EqualAngle(pointA, vertexV, pointB, pointC, vertexW, pointD)
FixedAngle(pointA, vertexV, pointB, deg=D)
FixedAngle(pointA, vertexV, pointB, rad=R)
ParallelConstraint(pointA, pointB, pointC, pointD)       # AB ∥ CD
PerpendicularConstraint(pointA, pointB, pointC, pointD)  # AB ⊥ CD
Do NOT duplicate a relation already encoded by MidPoint/Intersect/ParallelLine/etc.

## Annotations
Annotation(objectId, visible=<true|false>, ...)
  Labels:
    label="<text>", labelPosition="top" (quoted string REQUIRED; auto/top/bottom/left/right/top-left/top-right/bottom-left/bottom-right)
    labelDistance=<px>, labelSize=<px>
    For segments: labelAnchor="middle" (start/middle/end), labelOffset=<n>, labelSide="left" (left/right)
  Point style:
    pointColor=<0xRRGGBB int>, pointSize=<n>, pointShape=<circle|hollow|square|diamond|cross|plus|x|arrow>
    pointAngle=<deg> for arrows (0≈right when absolute; path-dependent points use path tangent baseline)
    pointBorder=<none|solid|dashed>, pointBorderColor=<int>, pointBorderWidth=<px>
    labelColor=<int> (label text color)
  Line style:
    lineColor=<int>, lineWidth=<n>, lineDash=[a,b,...], opacity=<0~1>, isGuide=<true|false>
  Graph render box (Function/Quadratic/Polynomial/QuadraticFD):
    useGraphRange=<bool>, graphXMin, graphXMax (domain), graphYMin, graphYMax (range)
    graphTMin/graphTMax are legacy QuadraticFD-only params; prefer the x/y box.
Defaults / pitfalls:
  - Omit pointSize for Auto: only free / on-path points get a marker, while intersections
    and segment endpoints stay hidden. pointSize=0 forces hidden, 2~6 emphasizes a point.
  - Guides: isGuide=true, often opacity≈0.35 and lineDash=[4,4].
  - Never emit UI-only keys (drawMode, showUIOverlay, etc.) into DSL.

AngleAnnotation(pointA, vertex, pointB, visible=..., label=..., labelSize=..., isLatex=...,
  radius=<px>, labelOffset=<n>, lineColor=<int>, lineWidth=<n>, opacity=<0~1>)
AngleAnnotation(segmentOrLine1, vertex=<V>, segmentOrLine2, ...)
  vertex must be an endpoint of each segment/line for a stable arc.
  Marks: markKind=<none|right|equal>, equalMarkStyle=<tick|arc|circle>, markCount=<1~3>,
    arcSide=<minor|major>, labelColor=<int>, labelArc=<n> (label position along the arc)

SegmentStyle(pathId, from=<t 0~1>, to=<t 0~1>, lineColor=<int>, lineWidth=<n>, lineDash=[...], opacity=<0~1>)
  Style only part of a path (e.g. dashed piece between two intersections). Annotations section.

@axes: xMin=<n>, xMax=<n>, yMin=<n>, yMax=<n>[, tickStep=<n>, showArrows=<bool>, showLabels=<bool>,
  showTickLabels=<bool>, xLabel="x", yLabel="y", originLabel="O", color=<int>, lineWidth=<px>]
  Coordinate axes as a document setting (one per document, header line). Never draw axes as Segments.
  Intersect with axes via sources Axis(x) / Axis(y). Visible axes bound FillRegion faces.

@const: a=2 [-5..5 step 0.5], b=-1
  Document constants (header line) used in Function/ParametricCurve expressions. Undefined names → invalid graph.
  Asymptotes: draw as Line through two hidden FreePoints with lineDash=[6,4].

Text(x=<n>, y=<n>, text="<string>", visible=<bool>, fontSize=<px, default 14>, color=<int>, isLatex=<bool>)
  Standalone text anchored at the center. Not a geometry object.

FillRegion(seedX=<n>, seedY=<n>, boundaries="path1 path2 ..." (optional: only these paths bound a projected face), visible=<bool>, fillColor=<int>, fillOpacity=<0~1>,
  pattern=<solid|hatch>, patternAngle=<deg, default 45>, patternSpacing=<px, default 6>)
  Fills the closed face containing the seed. Guide objects are not boundaries.

## IDs / numbers / labels
- IDs: letters, digits, underscore; start with letter/underscore. Keep stable when editing.
- Numbers: integers or decimals; no thousands separators.
- Labels: prefer LaTeX inside $...$. Point names use $\rm{A}$ (single backslash in DSL text).
- One logical geometric point => one ID; reuse that ID everywhere.

## Relation-first construction order
1) Identify objects/labels 2) Identify relations+evidence 3) Split free vs dependent points
4) FreePoint only for free points 5) Build dependents via constructors
6) Add constraints only for leftover relations 7) Adjust coords/@frame/labels/styles last
8) Mentally drag free points: midpoints/intersections/tangents/parallel/perp must hold.

## Mini examples (patterns only)
# Median intersection (good)
A: FreePoint(-15,-10)
B: FreePoint(15,-10)
C: FreePoint(0,20)
D: MidPoint(B, C)
E: MidPoint(A, C)
med_AD: Segment(A -> D)
med_BE: Segment(B -> E)
G: Intersect(Line(A -> D), Line(B -> E), index=0)

# Bad (do not approximate dependents)
# D: FreePoint(7.5,5)
# E: FreePoint(-7.5,5)
# G: FreePoint(0,0)

## Intersect source cheat
Intersect accepts IDs or inline sources, e.g.:
  P: Intersect(seg_AB, circ_O, index=0)
  Q: Intersect(Line(A -> B), Circle(center=O, through=A), index=1)
  R: Intersect(Function("x^2", xMin=-10, xMax=10), Line(A -> B), index=0)
When two circles meet twice, choose index by intended visual location (do not invent a FreePoint).

## Style quick recipes
# Hidden construction point
ann_H: Annotation(H, visible=true, pointSize=0)
# Emphasized vertex
ann_A: Annotation(A, visible=true, label="$\rm{A}$", labelPosition="bottom-left", pointSize=4)
# Dashed guide line
ann_guide: Annotation(guide_line, visible=true, isGuide=true, opacity=0.35, lineDash=[4,4])
# Axis arrow tip
ann_x: Annotation(x_end, visible=true, label="$x$", labelPosition="right", pointShape="arrow", pointAngle=0)

## Editing reminders for LLM output
- Preserve existing object IDs and dependency edges when possible.
- Keep @frame if present in current DSL.
- Prefer constructors that survive dragging over visually similar FreePoint clouds.
- If the current DSL cannot express a mark/color/special curve, approximate and note limits outside this cheatsheet via the chat <dsl-error> channel when that channel is enabled.
