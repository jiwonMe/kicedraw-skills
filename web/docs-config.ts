export const docsGroups = [
  {
    title: "학습",
    pages: [
      {
        slug: "",
        file: "index",
        title: "문서 홈",
        description: "ClassGeo DSL로 도면을 그리는 방법을 목적별로 찾아보세요.",
      },
      {
        slug: "quickstart",
        file: "quickstart",
        title: "첫 도면 만들기",
        description: "삼각형의 중선을 작도하고 CLI로 검증해 SVG를 내보냅니다.",
      },
      {
        slug: "learn",
        file: "learn",
        title: "유형별 실습",
        description: "조각함수, 넓이와 음영, 구의 단면을 예제로 익힙니다.",
      },
    ],
  },
  {
    title: "DSL 레퍼런스",
    pages: [
      {
        slug: "syntax",
        file: "syntax",
        title: "파일 구조와 수치",
        description: "헤더, 좌표계, 상수와 수치 풀이의 문법입니다.",
      },
      {
        slug: "geometry",
        file: "geometry",
        title: "평면 작도",
        description: "점, 경로, 교점, 접선, 원뿔곡선과 변환을 찾습니다.",
      },
      {
        slug: "graphs-and-solids",
        file: "graphs-and-solids",
        title: "그래프와 공간도형",
        description: "함수 그래프, 정의역, 3D 장면과 투영을 설명합니다.",
      },
      {
        slug: "annotations",
        file: "annotations",
        title: "표식과 조판",
        description: "라벨, 점선, 각 표시, 닫힌 영역과 수식의 문법입니다.",
      },
    ],
  },
  {
    title: "개발",
    pages: [
      {
        slug: "cli",
        file: "cli",
        title: "CLI·검수",
        description: "검사와 SVG·PNG 출력 명령, 오류를 확인하는 순서입니다.",
      },
      {
        slug: "development",
        file: "development",
        title: "개발·기여",
        description: "웹을 실행하고 예제·문서를 추가하는 유지보수 안내입니다.",
      },
    ],
  },
];
export const docsPages = docsGroups.flatMap((g) =>
  g.pages.map((page) => ({ ...page, group: g.title })),
);
export const docsUrl = (slug: string) => (slug ? `/docs/${slug}/` : "/docs/");

export const examples = [
  {
    id: "median",
    width: 90,
    alt: "삼각형에서 두 점선 중선이 G에서 만나는 도면",
  },
  {
    id: "piecewise",
    width: 85,
    alt: "x=0에서 왼쪽 구간은 열린 점, 오른쪽 구간은 닫힌 점인 조각함수",
  },
  {
    id: "scalars",
    width: 65,
    alt: "내부를 회색으로 채우고 직각을 표시한 삼각형",
  },
  {
    id: "section",
    width: 95,
    alt: "구와 수평면의 단면, 구 중심 O와 단면 중심 H",
  },
];
