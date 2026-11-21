# 첨부 도면 재현 6종

시험지 테두리·발문을 제외한 도면을 재작도했다. 원본 이미지를 SVG에 넣지 않는다. 선, 곡선, 점, 글자, 음영은 모두 DSL에서 생성한다. 아래 폭은 재현본의 출력 설정이며 원본의 실측값이 아니다.

| 도면 | DSL / SVG | 재현 기준 |
| --- | --- | --- |
| GE30 · 구와 절단 평면 | [DSL](fig-ge30.dsl) · [SVG](fig-ge30.svg) | 투영된 단면 전체가 회색이다. 평면 외곽은 흰색으로 남고, 구와 단면의 뒤쪽 윤곽만 점선이다. |
| GE29 · 이차곡선 | [DSL](fig-ge29.dsl) · [SVG](fig-ge29.svg) | 원점에서 오른쪽으로 열린 포물선, 두 쌍곡선 가지, 준선, 수평선 BA 및 B의 직각 표식을 구분한다. 초점거리 p는 1로 정규화했다. |
| GE27 · 육각기둥 | [DSL](fig-ge27.dsl) · [SVG](fig-ge27.svg) | 위아래 꼭짓점을 같은 벡터로 대응시키고 FE의 중점 M을 잡는다. GIM만 회색이며, 앞 모서리가 그 위를 지나간다. |
| CA26 · 삼각 단면 입체 | [DSL](fig-ca26.dsl) · [SVG](fig-ca26.svg) | 주어진 제곱근 함수의 바닥 곡선과 능선을 같은 매개변수로 그린다. x=2의 절단선, 중간 단면의 진한 음영, 첫 단면의 숨은선을 보존한다. |
| C14 · 함수와 두 직선 | [DSL](fig-c14.dsl) · [SVG](fig-c14.svg) | 두 직선이 f 위의 P를 공유하고 g와 각각 Q, R에서 만난다. 발문에 식이 없어 평행이동한 로그함수로 구도를 복원했다. |
| C04 · 구간별 함수 | [DSL](fig-c04.dsl) · [SVG](fig-c04.svg) | x=−1에서 왼쪽 극한 1·함숫값 2, x=0에서 왼쪽 극한 3·함숫값 0, x=1에서 왼쪽 극한 2·함숫값 1을 구분한다. |

공간도형은 첨부 시점에서의 **2차원 투영 작도**다. 발문에 없는 길이·투영각·단면 높이 등은 그림에 맞춘 대표값이지 원문 조건을 추정한 답이 아니다. 회전 가능한 3D 모델이나 스캔과의 픽셀 일치를 보장하지 않는다.

### 다시 생성하기

각 파일 머리말의 `@widthMm` 값을 두 CLI에 동일하게 넘긴다. 예컨대 GE30은 스킬 폴더에서 다음처럼 출력한다.

```sh
node bin/kicedraw.mjs check references/reproductions/fig-ge30.dsl --width-mm 117
node bin/kicedraw.mjs svg references/reproductions/fig-ge30.dsl /tmp/ge30.svg --width-mm 117
node bin/kicedraw.mjs png /tmp/ge30.svg /tmp/ge30.png
```

공간도형에서 투영선이 면을 가로지르면 `FillRegion(seedX=..., seedY=..., boundaries="GI IM MG", ...)`처럼 실제 면의 경로만 지정한다. 지정한 경로가 닫히지 않거나 시드가 밖이면 면은 생성되지 않는다. 생략하면 기존처럼 보이는 모든 경로와 축을 사용한다.
