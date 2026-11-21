# 수능 수학 도면 스킬

Node.js 22 기준. 배포 폴더 안의 JS 번들에 ClassGeo 엔진과 MathJax가 들어 있어 SVG 출력에는 `npm install`, MCP, 저장소 체크아웃이 필요 없다. PNG만 별도 렌더러가 필요하다.

## 수식 엔진

기본값은 **Upmath**다. 번들에 있는 수식은 오프라인에서도 동작한다. 그 밖의 LaTeX는 HTTPS로 i.upmath.me에 전송되며, 처음 불러올 때 네트워크가 필요하다. 생성된 SVG에는 외부 URL이나 서비스 스크립트 대신 글리프 경로가 포함된다. 외부 전송을 원하지 않거나 오프라인에서 임의의 수식을 써야 한다면 DSL 첫머리에 다음을 지정한다.

```text
@mathRenderer: "mathjax"
```

## 설치와 호출

`npx skills add jiwonMe/kicedraw-skills --skill kicedraw -g`

ZIP에서 푼 `kicedraw` 폴더 전체를 Claude Code의 `~/.claude/skills/kicedraw` 또는 Codex의 `~/.agents/skills/kicedraw`에 복사한다(`~/.codex/skills`를 사용하는 설치라면 해당 경로). 새 세션에서 Claude Code는 `/kicedraw`, Codex는 `$kicedraw`으로 호출하고 발문과 인쇄 폭을 준다. 에이전트 없이도 아래 CLI를 사용할 수 있다.

```sh
# 스킬 폴더에서 실행. 출력 파일은 작업 디렉터리에 보관한다.
node bin/kicedraw.mjs check assets/examples/tangent-area.dsl
node bin/kicedraw.mjs svg assets/examples/tangent-area.dsl /tmp/tangent.svg
node bin/kicedraw.mjs png /tmp/tangent.svg /tmp/tangent.png
# 다른 폭으로 출력하려면 export 시 --width-mm 80 추가
```

`export-svg`는 DSL 문법 검증 후 수능 프리셋으로 출력한다. `render`에는 이 스킬로 만든 신뢰할 수 있는 자체 포함 SVG(mm 단위)만 넣는다. 백엔드는 로컬 `@resvg/resvg-js`, Chromium 계열 브라우저(`CLASSGEO_BROWSER`로 경로 지정 가능), `resvg`/`rsvg-convert`/`inkscape`/`magick`, macOS Quick Look 순으로 시도한다.

| `render` 종료 코드 | 의미 |
| --- | --- |
| 0 `RENDER_OK` | 300dpi 상당 PNG 생성. 직접 열어 확인해야 시각 검수가 끝난다. |
| 2 `RENDER_PENDING` | 렌더러 없음 또는 `CLASSGEO_RENDER_BACKEND=none`. PNG를 쓰지 않는다. |
| 1 `RENDER_ERROR` | 잘못된 입력, 파일 쓰기 실패, 발견된 렌더러의 변환 실패 등. 보류와 구분한다. |

`node bin/kicedraw.mjs check input.dsl [--width-mm 60]`는 기하·조판 오류 6종과 경고 6종을 점검한다. 오류면 종료 코드 1, 경고만 있으면 0이며 원본 줄 번호와 수정 힌트를 출력한다. MCP와 웹 채팅의 `validate_dsl`에서도 `preset: "kicedraw"`으로 같은 검사를 요청할 수 있다. [카탈로그](references/catalogue/index.md)에서 7개 패밀리의 DSL·SVG와 인쇄 폭을 찾을 수 있다.
