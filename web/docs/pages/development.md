## 구성

| 경로 | 역할 |
| --- | --- |
| `skills/kicedraw/` | 공개 스킬 배포본. 작업 지침, 인쇄 기준, 카탈로그와 CLI 번들이 들어 있습니다. |
| `skills/kicedraw/bin/kicedraw.mjs` | 버전이 붙은 배포 CLI. 파싱·기하 계산·조판·검증은 이 번들이 담당합니다. 생성된 번들을 직접 고치지 않습니다. |
| `web/examples/` · `web/build.ts` | 재현 도면 매니페스트와 SVG·DSL 해시 확인. 확인된 파일만 갤러리에 복사합니다. |
| `web/docs/pages/` · `web/docs/examples/` | 문서 본문과 실습 원본·정답 도면. |
| `web/build-docs.ts` · `web/src/docs/` | 문서 사이트 구조와 스타일. Markdown을 정적 HTML로 생성합니다. |

언어 변경은 원본 ClassGeo에서 합니다. 새 작도 생성자라면 기하 객체(`packages/core`), 파서·직렬화(`packages/dsl`), 출력·표시(`packages/renderer-svg` 등)와 테스트를 함께 검토한 뒤 스킬을 새로 릴리스합니다. 문서와 갤러리는 이미 배포된 버전에 없는 문법을 먼저 소개하지 않습니다.

## 로컬 실행

~~~sh
npm ci --prefix web
npm run dev --prefix web
npm run build --prefix web
~~~

개발 서버의 `/docs/`에서 문서를 엽니다. Markdown이나 실습 파일을 바꾼 뒤 `npm run docs:build --prefix web`을 다시 실행하세요. Vercel 배포는 `web/dist/`를 정적 사이트로 제공합니다. 브라우저에서 DSL을 실행하거나 렌더링 서비스에 접근하지 않습니다.

## 문서와 실습 수정

1. `web/docs/pages/`의 Markdown을 수정합니다. 페이지를 새로 만들면 `web/docs-config.ts`의 페이지 목록에 제목과 설명을 추가하세요.
2. 완전한 실행 예제는 `web/docs/examples/`에 DSL을 둡니다. 새 예제의 이름·폭·대체 텍스트를 예제 목록에 등록하고 본문에 `~~~example 파일이름` 울타리를 넣으면 같은 원본에서 코드와 다운로드가 생성됩니다.
3. `npm run docs:examples --prefix web`으로 예제를 검사하고 정답 SVG 및 원본 해시를 다시 만듭니다. Upmath에 내장되지 않은 수식은 이 단계에서 네트워크가 필요할 수 있습니다. DSL과 SVG, 해시를 함께 리뷰합니다.
4. 빌드하고 각 페이지로 직접 진입해 링크와 흐름을 확인하세요. 일반 문서 빌드는 커밋된 예제만 사용합니다. 실습 B의 의도된 직각 경고는 오류가 아닙니다.

## 갤러리 및 히어로에 기여

갤러리 도면은 실제 크기에서 `check`와 `svg`를 실행한 뒤 `web/examples/manifest.json`에 두 파일의 SHA-256을 기록합니다. 히어로는 REP-01~09에 한정하며 `web/hero-frames.ts`에서 매 프레임 DSL 입력을 바꾸고 `npm run hero:generate --prefix web -- REP-03`처럼 다시 만듭니다. 이것은 사이트의 빌드 도구이며, DSL 자체에 애니메이션 지시문이 있다는 뜻은 아닙니다. 갤러리 원본을 보존하고, 움직이는 라벨은 대상 객체에 붙이며, 포스터는 애니메이션의 첫 프레임과 일치시킵니다.
