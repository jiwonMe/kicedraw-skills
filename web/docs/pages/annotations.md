## 점 라벨과 선 스타일

| 옵션 | 사용법 |
| --- | --- |
| `label="$\mathrm{A}$"` | 점 이름은 직립체. DSL 파일 안에서는 역슬래시 한 개를 적습니다. |
| `labelPosition="top-left"` | `auto`, 상하좌우 및 대각선. 움직이는 그림에서 배치가 바뀌지 않게 하려면 방향을 고정하고 전 구간을 확인하세요. |
| `labelDistance` · `labelSize` | 라벨 간격 · 크기. 2D 기하 좌표와 같은 단위가 아닙니다. |
| `pointSize=0` | 라벨은 남기고 점 기호만 생략. `visible=false`는 객체 표시를 숨깁니다. |
| `lineDash=[4,3]` · `opacity=0.35` | 점선 패턴 · 표시 불투명도. |
| `labelAnchor="middle"` · `labelSide="left"` · `labelOffset=20` | 선분의 길이 라벨 위치. 좌우는 선분 방향을 기준으로 합니다. |

`SegmentStyle(s,from=0.2,to=0.6,lineDash=[4,3])`은 경로 전체가 아니라 해당 매개변수 구간에 스타일을 지정합니다. `Text(x=1,y=2,text="$y=f(x)$",isLatex=true)`는 2D 도면 좌표에 고정되는 텍스트입니다. 점을 따라가야 하는 라벨에는 `Annotation`을 쓰세요.

## 각·직각 표시

`AngleAnnotation(A,V,B,label="$\theta$",isLatex=true,radius=24)`에서 두 번째 점 V가 꼭짓점입니다. `markKind="right"`는 직각, `markKind="equal"`은 같은 각 표시에 씁니다. 표시가 실제 기하를 만들지는 않습니다. 두 직선이 수직인지 먼저 정의로 확인하세요.

## 음영

`FillRegion(seedX=1,seedY=2,boundaries="AB BC CA",fillColor=0,fillOpacity=0.12)`는 경로들이 닫는 면 중 시드를 포함한 면을 채웁니다. 시드를 선 위가 아니라 내부에 두고, 필요하다면 `boundaries`로 관계없는 보조선이 면을 쪼개지 않게 하세요. `isGuide=true`인 경로는 채움 경계로 쓰지 않습니다. 카메라나 입력 조건이 바뀌면 면과 시드가 계속 맞는지 확인합니다.

## 수식과 인쇄 검수

기본 수식 렌더러는 **Upmath**입니다. 번들에 없는 LaTeX는 처음 렌더링할 때 i.upmath.me에 보내며, 완성 SVG에는 글리프가 포함됩니다. 외부 전송 없이 임의의 수식을 렌더링해야 한다면 명시적으로 `@mathRenderer: "mathjax"`를 선택하세요. 일반 텍스트는 수식 서비스로 보내지 않습니다.

납품 폭에서 흑백으로 확인하고, 곡선과 라벨이 붙지 않는지, 열린/닫힌 끝점이 구별되는지, 점선이나 음영이 실제 조건보다 더 많은 것을 암시하지 않는지 검토하세요. [CLI·검수](/docs/cli/)에 검사 순서와 실패 대응이 있습니다.
