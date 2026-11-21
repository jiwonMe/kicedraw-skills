**목표:** 삼각형의 두 중선과 그 교점을 만들고, 90mm 폭 SVG로 저장합니다. Node.js 22를 기준으로 합니다.

## 1. CLI 준비

[설치 안내](/#install)의 명령으로 스킬을 설치한 뒤, 설치된 `kicedraw` 폴더(안에 `bin/kicedraw.mjs`가 있는 폴더)에서 아래 명령을 실행하세요. 저장소를 복제했다면 `skills/kicedraw/`가 그 폴더입니다.

~~~sh
node bin/kicedraw.mjs --version
~~~

## 2. 삼각형과 중선 선언

다음 코드를 `median.dsl`에 저장하세요. A, B, C만 독립점입니다. D와 E는 중점이고, G는 이미 선언한 두 **유한 선분**의 교점입니다. 각 객체는 고유 ID를 가지며 뒤의 줄에서 이름으로 참조됩니다.

~~~example median
~~~

위쪽은 기하 관계이고, `---annotations---` 아래는 점 이름과 점선 같은 표시입니다. 점선 선언을 지워도 G의 정의는 바뀌지 않습니다.

## 3. 검증하고 내보내기

~~~sh
node bin/kicedraw.mjs check median.dsl --width-mm 90
node bin/kicedraw.mjs svg median.dsl median.svg --width-mm 90
~~~

검사에 통과했더라도 SVG를 열어 G가 두 중선의 교점인지, 라벨이 선에 닿지 않는지 확인합니다. 그림 대부분이 잘리면 인쇄 폭이 아니라 먼저 `@frame`을 확인하세요.

## 4. 조건을 바꿔 보기

C만 `FreePoint(-2,3)`으로 바꾼 뒤 두 명령을 다시 실행하세요. 정답 검산: D는 그대로이고 E와 G는 새 위치로 이동합니다. G를 새 좌표의 `FreePoint`로 바꾸면 이 관계가 사라집니다.

다음: [그래프·음영·입체 실습](/docs/learn/)
