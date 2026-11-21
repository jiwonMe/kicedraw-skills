# KICEDraw

수능 수학 도면을 편집 가능한 DSL로 작성하고 인쇄 폭에 맞춰 검증·출력하는 에이전트 스킬입니다. 이 저장소는 배포본만 제공합니다.

## 자동 업데이트

1.0.0부터 스킬을 호출하거나 CLI를 실행하면 `https://kicedraw.com/skill/latest.json`의 버전을 확인합니다. 더 높은 버전일 때만 같은 도메인의 ZIP을 내려받고 SHA-256과 파일 목록을 확인한 뒤 설치본을 교체합니다. 도면은 업데이트 서버로 보내지 않습니다. 오프라인·검증 실패·설치 폴더에 로컬 변경이 있으면 기존 버전을 계속 사용합니다. `KICEDRAW_NO_UPDATE=1`로 조회를 끌 수 있습니다. 최초 배포본은 업데이터가 없으므로 아래 설치 명령으로 한 번 갱신하세요.

## 설치

```sh
npx skills add jiwonMe/kicedraw-skills --skill kicedraw -g
```

에이전트를 선택한 뒤 새 세션에서 Pi는 `/skill:kicedraw`, Claude Code는 `/kicedraw`, Codex는 `$kicedraw`로 호출하세요. 예: “반원과 접선으로 둘러싸인 영역을 그리고 60mm SVG로 출력해 줘.”

Node.js 22 기준입니다. 검증과 SVG 출력에는 별도 패키지 설치나 ClassGeo 서버가 필요 없습니다. PNG에는 로컬 렌더러가 필요합니다. 기본 수식 엔진은 Upmath이며 캐시에 없는 수식은 외부로 전송됩니다. 로컬 수식 처리만 원하면 DSL에 `@mathRenderer: "mathjax"`를 명시하세요.

[사용 안내](skills/kicedraw/README.md) · [도면 카탈로그](skills/kicedraw/references/catalogue/index.md) · [라이선스 고지](skills/kicedraw/LICENSE)
