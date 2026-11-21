## 점과 경로

| 문법 | 무엇을 만드는가 |
| --- | --- |
| `FreePoint(x,y)` | 독립점. 문제가 정한 좌표나 독립 꼭짓점에 사용합니다. |
| `MidPoint(A,B)` | 두 점의 중점. |
| `Division(A,B,m=1,n=2,kind=internal)` | AP:PB가 1:2인 내분점. 외분은 `external`이고 m과 n이 달라야 합니다. |
| `PointOnPath(s,t=0.5)` | 경로의 정규화 매개변수 위치(0~1). 곡선에서는 반드시 호길이의 절반이라는 뜻은 아닙니다. |
| `Projection(P onto A -> B)` | P에서 A와 B를 지나는 직선에 내린 수선의 발. 축에는 `Projection(P onto Axis(x))`. |
| `Segment(A -> B)` · `Ray(A -> B)` · `Line(A -> B)` | 유한 선분 · A에서 B 방향으로 뻗는 반직선 · 양방향 직선. |
| `ParallelLine(P, A -> B)` · `PerpendicularLine(P, A -> B)` | P를 지나며 AB와 평행 또는 수직인 직선. |
| `Vector(A -> B)` | B에 화살촉이 붙은 벡터. |
| `Centroid(A,B,C)` · `Orthocenter(A,B,C)` | 삼각형의 무게중심 · 수심. |

## 교점과 접점

`Intersect(s,c,index=0)`는 두 경로의 교점입니다. **선분은 먼저 ID로 선언**한 뒤 넘기세요. 연장선의 교점이 필요한 경우에만 `Intersect(Line(A -> B),c,index=0)`처럼 무한 직선을 사용합니다. 여러 교점이 있을 때 `index`는 0부터 시작합니다. 번호만 보고 위치를 가정하지 말고 실제 그림에서 확인하세요.

원 바깥의 P에서 접선을 만들 때는 `Tangent(P,Circle(center=O,through=A),index=0)`로 접점 T를 얻고, `Segment(P -> T)`를 이으세요. 타원·쌍곡선 등에는 `ConicTangent(P,c,index=0)`, 함수 그래프에는 `FuncTangent(P,f,index=0)`를 사용합니다.

## 원·원뿔곡선·변환

| 문법 | 의미 |
| --- | --- |
| `Circle(center=O,through=A)` · `Circle(center=O,radius=3)` | O 중심에 A를 지나는 원 · 반지름이 주어진 원. |
| `Circumcircle[A,B,C]` | 일직선 위에 있지 않은 세 점을 지나는 원. |
| `Arc(center=O,start=A,end=B,direction=ccw)` | O를 중심으로 A에서 B까지 반시계 방향 호. `cw`는 시계 방향. |
| `Ellipse(focus1=F1,focus2=F2,through=P)` · `Hyperbola(focus1=F1,focus2=F2,through=P)` | 두 초점과 한 점을 사용하는 타원 · 쌍곡선. |
| `QuadraticFD(focus=F,directrix=A -> B)` | 초점과 준선으로 정의한 포물선. 축에 평행하지 않은 배치도 가능합니다. |
| `RotatePoint(P about O,angle=60)` | O 중심에서 반시계 방향으로 60° 회전한 점. |
| `ReflectPoint(P across A -> B)` · `ReflectPoint(P about O)` | 선대칭 · 점대칭. |
| `TranslatePoint(P by U -> V)` · `DilatePoint(P about O,factor=2)` | 평행이동 · 중심을 둔 확대/축소. |

## 제약은 마지막 수단

`EqualLength(A,B,C,D)`, `FixedAngle(A,V,B,deg=60)`, `ParallelConstraint(A,B,C,D)`처럼 생성자로 아직 표현하지 못한 조건을 `---constraints---`에 넣습니다. `MidPoint`나 `ParallelLine`이 이미 정한 관계를 다시 제약으로 쓰지 마세요. 직각 표시 역시 수직을 **만드는** 제약이 아니라 이미 성립하는 관계를 **보여주는** 표식입니다.
