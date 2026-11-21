# KICEDraw 도면 자료실

React + TypeScript + Tailwind CSS + Vite. 제목은 SUITE, 본문은 SUIT를 사용하며 폰트와 라이선스는 `public/fonts/`에 포함한다.

저장소 루트에서 `npm ci --prefix web` 후 `npm run dev --prefix web`으로 개발한다. `npm run build --prefix web`은 strict 타입 검사와 재현 도면의 SVG·DSL 해시 검사를 수행하고 `web/dist/`를 생성한다. 웹 갤러리에는 `examples/manifest.json`의 REP 도면만 게시한다. 스킬 카탈로그 42종은 그대로 별도 제공한다. 기존 재현 5종은 스킬 안의 SVG·DSL을 그대로 사용하고 새 도형 2종과 GE30 직교투영본만 `examples/`에서 관리한다.

Vercel은 저장소 루트를 Root Directory로 사용한다. 설치·빌드 명령과 출력 경로는 루트 `vercel.json`에 있다. 스킬 엔진 번들은 사이트에 배포하지 않는다.
