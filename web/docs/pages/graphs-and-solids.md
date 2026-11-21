## 함수 그래프

| 문법 | 의미 |
| --- | --- |
| `Function("x^2-1",xMin=-2,xMax=2)` | 지정한 정의역의 함수 그래프. `FunctionGraph`는 별칭입니다. |
| `ParametricCurve("cos(t)","sin(t)",tMin=0,tMax=3.14)` | 매개변수 곡선. 두 식에서 매개변수를 `t`로 적습니다. |
| `Quadratic[A,B,C]` · `Polynomial[A,B,C,D]` | 점을 지나는 이차함수 · 보간 다항함수. |
| `Intersect(f,Axis(y),index=0)` | 그래프와 y축의 교점. 그래프의 선언 범위 안에 있어야 합니다. |

식에는 `x`, `pi`, `e`, `sqrt`, `abs`, `exp` 등을 쓸 수 있습니다. 밑을 명시하려면 예를 들어 `log(x)/log(2)`를 사용하세요. 조각함수는 한 구간에 한 그래프를 선언하고 `startMark`·`endMark`를 `open`·`closed`·`none`으로 지정합니다. `@frame`은 그림을 자르는 범위이지 함수의 정의역을 대신 설정하지 않습니다.

예제: [열린 끝점과 닫힌 끝점](/docs/learn/#section-1), [지수·로그와 수직선](/#REP-09).

## 공간도형과 카메라

먼저 `Scene3D(origin=O,view="orthographic",azimuth=-60,elevation=25)`를 만들고, 각 멤버의 첫 인자로 장면 ID를 넘깁니다. 모두 같은 직교 카메라와 가려짐 계산을 공유합니다. 장면 내부 좌표는 `[x,y,z]`이고 z가 높이입니다. `origin`은 투영 결과를 배치하는 2D 점입니다.

| 문법 (장면 ID: s) | 구성 |
| --- | --- |
| `Sphere(s,at=[0,0,0],radius=2.4)` | 중심과 반지름. |
| `Plane(s,at=[0,0,-1.2],normal=[0,0,1],width=6,height=5)` | 위치·법선·폭·높이로 정하는 유한 평면. |
| `Box(s,at=[0,0,0],size=[2,2,2])` | 위치와 세 변의 크기. |
| `Cylinder(s,at=[0,0,0],axis=[0,0,1],height=3,radius=1)` | 밑면 중심·축·높이·반지름. |
| `Line3D(s,from=[0,0,0],to=[0,0,2])` | 공간 선분. |
| `Point3D(s,x=0,y=0,z=-1.2)` | 같은 장면으로 투영된 점. 이 점에 `Annotation`을 붙이면 카메라를 바꿔도 라벨이 따라옵니다. |

`azimuth`는 +x에서 +y 쪽으로 재는 방위각, `elevation`은 xy 평면 위로 재는 고도각입니다. 둘 다 도 단위입니다. 장면에 `showHidden=false`를 주면 가려진 구간을 숨깁니다. 점을 투영하는 `Point3D(s,...)`와 별도로, 기존 파일의 `Point3D(O,...)`는 2D 기준점을 받아 고정된 사영을 사용합니다. 같은 그림에서 두 방식을 섞지 않는 것이 좋습니다.
