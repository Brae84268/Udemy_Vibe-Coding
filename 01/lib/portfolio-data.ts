/**
 * 개발자 소개 & 포트폴리오 공용 데이터
 * - 웹사이트(페이지)와 API에서 동일하게 사용
 */

export type ProjectItem = {
  id: number | string;
  title: string;
  description: string;
  detailDescription?: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  portfolioUrl?: string;
};

export type DeveloperContact = {
  email: string;
  github?: string;
  linkedin?: string;
};

export type DeveloperProfile = {
  name: string;
  title: string;
  /** 한 줄 소개 (히어로용) */
  shortBio: string;
  /** 상세 소개 (소개 섹션용, API에서도 사용) */
  bio: string[];
  /** 기술/스택 (선택) */
  skills: string[];
  contact: DeveloperContact;
};

export const developerProfile: DeveloperProfile = {
  name: "김브래",
  title: "개발자",
  shortBio:
    "웹/앱 개발 결과물을 소개하는 공간입니다. 관심 있는 프로젝트를 아래에서 확인해 보세요.",
  bio: [
    "여기에 자신의 소개, 관심 분야, 사용하는 기술 스택, 경력 등을 자유롭게 작성하세요. 여러 문단으로 나누어도 됩니다.",
    "예: 프론트엔드/백엔드/풀스택 개발에 관심이 있고, 사용자 경험과 코드 품질을 중요하게 생각합니다.",
  ],
  skills: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS"],
  contact: {
    email: "your@email.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
};

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: "프로젝트 제목 1",
    description:
      "프로젝트에 대한 간단한 설명을 여기에 작성하세요. 사용 기술, 해결한 문제 등을 적을 수 있습니다.",
    detailDescription:
      "이 프로젝트는 React와 TypeScript, Tailwind를 사용해 구현했습니다.\n\n주요 기능과 해결한 문제, 학습한 내용 등을 여기에 자세히 적을 수 있습니다. 팝업에서만 보이는 상세 설명입니다.",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "https://picsum.photos/seed/project1/600/320",
    githubUrl: "https://github.com",
    portfolioUrl: "https://vercel.com",
  },
  {
    id: 2,
    title: "프로젝트 제목 2",
    description:
      "두 번째 프로젝트 설명. GitHub, 배포 링크 등을 추가할 수 있습니다.",
    detailDescription:
      "Next.js와 Node.js로 만든 풀스택 예제입니다. 상세 설명을 이렇게 여러 줄로 작성할 수 있어요.",
    tags: ["Next.js", "Node.js"],
    image: "https://picsum.photos/seed/project2/600/320",
    githubUrl: "https://github.com",
    portfolioUrl: "https://github.com",
  },
  {
    id: 3,
    title: "프로젝트 제목 3",
    description:
      "세 번째 프로젝트 설명. 포트폴리오에 맞게 자유롭게 수정하세요.",
    detailDescription:
      "Python FastAPI 백엔드 프로젝트입니다. API 설계, 인증, DB 연동 등 경험을 적어보세요.",
    tags: ["Python", "FastAPI"],
    image: "https://picsum.photos/seed/project3/600/320",
    githubUrl: "https://github.com",
  },
];
