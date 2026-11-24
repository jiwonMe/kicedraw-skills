---
name: kicedraw
description: 수능·평가원 스타일 수학 도면을 ClassGeo DSL로 작도하거나 기존 도면을 비평할 때 사용한다. 인쇄 폭을 정하고 기하 관계를 보존한 SVG를 만든 뒤 PNG에서 조판을 검수한다.
---

# 수능 도면 작도와 비평

호출될 때마다 먼저 스킬 폴더에서 `node bin/kicedraw.mjs update`를 실행한다. 업데이트가 적용되면 SKILL.md를 다시 읽고 계속한다. 오프라인에서는 기존 버전을 사용한다.

기출 그림을 재현할 때는 [원본 대응 재현 예제 6종](references/reproductions/index.md)에서 비슷한 끝점·단면·숨은선 처리 방식을 먼저 확인한다. 새 도면은 [카탈로그](references/catalogue/index.md)에서 발문과 같은 기하 관계를 찾아 DSL을 참고한다. 이후 [작도 절차](references/workflow-drawing.md), 기존 도면의 결함 진단은 [비평 절차](references/workflow-critique.md)로 시작한다. 모든 스크립트 경로는 이 스킬 폴더 기준이다. 사용자의 작업 파일은 스킬 밖에 저장한다.

## 작도 규칙 12가지

1. 교점·접점·중점·수선의 발은 좌표로 추측하지 말고 `Intersect`, `FuncTangent`, `MidPoint`, `Projection` 등으로 선언한다. 독립점만 `FreePoint`로 둔다.
   길이·각·비율에서 유도되는 수는 `@let`으로 이름 붙이고, 방정식의 미지수는 `@solve: h = root(lo, hi; 잔차식)`으로 구한다. 생성자·벡터 성분에는 `${h}` 등 식을 사용한다. 문제에서 준 좌표·치수와 시점·라벨 배치 같은 조판 선택은 별도로 명시한다. 좌표축으로 내린 발은 `Projection(P onto Axis(x))`처럼 선언한다.
2. 일반 삼각형이 우연히 이등변이나 직각으로 보이지 않게 한다. 반대로 발문에 주어진 특수 조건은 실제 기하 관계로 만든다.
3. 구할 길이·각을 눈금, 치수, 라벨로 누설하지 않는다.
4. 점 이름은 `$\mathrm{A}$`, 변수는 `$a$`처럼 적는다. DSL 파일에서는 LaTeX 명령 앞에 역슬래시를 한 번만 쓴다.
5. 원점 O는 축 기본 라벨을 쓰거나 왼쪽 아래에 한 번만 둔다.
6. `@axes`의 `tickStep`은 생략한다. 필요한 좌표만 점선 투영과 축 라벨로 보여 준다.
7. 꼭짓점·교점은 `pointSize=0`. 열린/닫힌 끝점이나 따로 강조할 이산점만 마커를 쓴다.
8. 주 도형은 먹색 실선, 보조선·점근선·숨은 모서리는 점선. 굵기나 색으로 강조하지 않는다.
9. 한 영역은 옅은 회색. 둘 이상 구분이 필요할 때만 빗금을 쓴다. 시드가 실제로 원하는 닫힌 면에 있는지 확인한다.
10. 수직 관계에만 `markKind="right"`를 쓰고 다른 각에는 호를 쓴다. 같은 길이·각 표식 역시 조건에 근거해야 한다.
11. 별도 요청이 없으면 60mm, 복잡한 두 도면은 75~80mm 폭에서 배치한다. 9pt 라벨을 줄이는 대신 `@frame`과 라벨 위치를 조정한다.
12. 최종 DSL을 검증하고 SVG를 내보낸 뒤 **같은 버전**의 PNG를 열어 검수한다. 수정하면 반복한다. 렌더러가 없으면 `Pending`, 실행 실패는 오류로 보고한다. 파일 생성만으로 검수 완료가 아니다.

[시각 문법과 예제](references/visual-grammar.md) · [인쇄 수치와 기준](references/drafting-standard.md) · [DSL 문법](references/dsl-cheatsheet.md)

## Faults to catch · 출력 전 확인

- `---annotations---` 안에서도 **모든 선언에 고유 ID와 콜론**이 필요하다. `Annotation(...)` 단독이 아니라 `ann_A: Annotation(...)`, `shade: FillRegion(...)`처럼 쓴다.
- 특정 다각형만 채우려면 경계가 되는 개별 `Segment` ID를 `boundaries`에 나열한다. 반복 도형에서는 요구한 반복 횟수를 확인하고 마지막 도형 내부에 시드를 둔다.

- 인쇄되어야 할 점선 투영선·숨은선에는 `lineDash=[4,3]`만 지정한다. `isGuide=true`는 편집용 가이드라 기본 SVG 내보내기에서 제외된다.
- 수선은 먼저 양 끝의 좌표 조건으로 검산한다. 세로 안내선은 두 끝의 x가 같고 x축 쪽 끝의 y가 0이어야 한다. 가로 안내선은 두 끝의 y가 같아야 한다. `Projection`의 두 기준점이 만드는 직선이 목표 축인지도 확인한다. 함수 끝점에 붙일 때는 `PointOnPath`로 실제 끝점에 연결한다.
- 회색 면에는 `fillColor=0, fillOpacity=0.16`처럼 **10진 정수와 불투명도**를 쓴다. DSL의 `0xD8D8D8`은 회색을 보장하지 않는다. 검은 면이 모서리를 가리면 인쇄본을 통과시키지 않는다.

## 검증과 납품

```sh
node bin/kicedraw.mjs check /path/figure.dsl
node bin/kicedraw.mjs svg /path/figure.dsl /path/figure.svg
node bin/kicedraw.mjs png /path/figure.svg /path/figure.png
```

`node bin/kicedraw.mjs check`의 오류를 해결하고 경고는 발문과 대조해 수정하거나 의도한 이유를 보고한다. 편집 원본 `.kicedraw`에 `@printWidthMm: 60`처럼 실제 인쇄 폭(mm)을 기록한다. 다른 폭으로 검수할 때만 두 명령에 동일한 `--width-mm`를 준다. 인쇄 크기에서 라벨과 축·곡선의 간격을 확인하고 점 이름은 정체로 쓴다. 린트 통과는 시각 검수를 대신하지 않는다. PNG가 없거나 열 수 없으면 이전 버전 PNG로 대체하지 않는다.

보고 양식: `DSL/SVG 경로 | 인쇄 폭 | DSL 검증 결과 | PNG 경로·백엔드 또는 Pending 사유 | 직접 확인한 내용 및 남은 문제`.
