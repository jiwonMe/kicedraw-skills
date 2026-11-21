# 선·점·면이 전달하는 의미

관계가 같으면 같은 기호를 쓴다. 기호가 다르면 수험생은 다른 조건이라고 읽는다. 아래 DSL을 수정해 자기 문제에 맞추고 SVG에서 차이를 확인한다.

| 구도 | 확인할 점 | 소스 / 출력 |
| --- | --- | --- |
| 삼각형과 중선 | 중점은 파생점이다. 중선을 외곽선처럼 실선으로 강조하지 않는다. | [DSL](grammar/01-construction.dsl) · [SVG](grammar/01-construction.svg) |
| 구간별 함수 | 같은 x의 두 함수값 중 정의되는 값만 닫힌 점으로 표시한다. | [DSL](grammar/02-endpoints.dsl) · [SVG](grammar/02-endpoints.svg) |
| 나뉜 두 영역 | 시드가 대각선의 반대편에 있어야 한다. 회색과 빗금을 겹치지 않는다. | [DSL](grammar/03-two-regions.dsl) · [SVG](grammar/03-two-regions.svg) |
| 직각과 일반각 | 수선을 내린 자리만 네모, 다른 각은 호. 호의 양 끝이 두 변에 닿아야 한다. | [DSL](grammar/04-angles.dsl) · [SVG](grammar/04-angles.svg) |
| 좌표 투영 | 눈금 전체 대신 지정한 점에서 내린 점선 하나와 축 위 좌표만 남긴다. | [DSL](grammar/05-projection.dsl) · [SVG](grammar/05-projection.svg) |
| 숨은 모서리 | 앞쪽 선은 끊지 않고, 뒤에 가려지는 모서리만 점선으로 이어 준다. | [DSL](grammar/06-hidden-edges.dsl) · [SVG](grammar/06-hidden-edges.svg) |
