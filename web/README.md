# KICEDraw 도면 자료실

React + TypeScript + Tailwind CSS + Vite. 제목은 SUITE, 본문은 SUIT를 사용하며 폰트와 라이선스는 `public/fonts/`에 포함한다.

저장소 루트에서 `npm ci --prefix web` 후 `npm run dev --prefix web`으로 개발한다. `npm run build --prefix web`은 strict 타입 검사와 재현 도면의 SVG·DSL 해시 검사를 수행하고 `web/dist/`를 생성한다. 웹 갤러리에는 `examples/manifest.json`의 REP 도면만 게시한다. 스킬 카탈로그 42종은 그대로 별도 제공한다. REP-03~08의 갤러리용 수정본은 `examples/`에서 관리한다. 원본 스캔은 게시하지 않으며, 각 DSL을 `@widthMm`에 표시한 폭으로 검증·출력한 뒤 SVG와 DSL의 SHA-256을 함께 갱신한다.

히어로 REP-01~09는 DSL 입력을 바꾸어 다시 작도한 왕복 애니메이션(WebP)을 사용한다. 갤러리·다운로드는 정적 원본 그대로다. 움직임 감소 설정에서는 정적 SVG를 사용한다. 애니메이션은 `public/hero/`에 포함되므로 배포 시에는 재생성할 필요가 없다. 예제를 수정한 뒤 Node.js와 Python 3(Pillow의 animated WebP 지원 필요)가 있는 환경에서 `npm run hero:generate --prefix web -- REP-06`으로 해당 도면을 재생성한다(번호 생략 시 9종 전체). 캐시되지 않은 Upmath 수식은 네트워크가 필요하다.

`/docs/` 문서는 `docs/pages/`의 한국어 Markdown에서 정적 HTML로 생성한다. 페이지를 고친 뒤 `npm run docs:build --prefix web`으로 다시 생성한다. 실습 DSL을 고쳤다면 `npm run docs:examples --prefix web`으로 CLI 검사·SVG·해시를 갱신하고 함께 커밋한다. 새 페이지와 예제는 `docs-config.ts`에 등록한다.

`/playground/`는 문서 실습을 편집하고 ClassGeo Web Worker에서 검증·SVG 출력을 실행한다. 커밋된 엔진은 `public/playground-engine/`에 있고, `npm run playground:test --prefix web`으로 CLI 실습 출력과 비교할 수 있다. 엔진 재생성은 [개발 문서](docs/pages/development.md)를 참고한다.

Vercel은 저장소 루트를 Root Directory로 사용한다. 설치·빌드 명령과 출력 경로는 루트 `vercel.json`에 있다. Node.js 스킬 CLI 번들과 별도로, 플레이그라운드용 브라우저 엔진을 정적 자산으로 제공한다.
