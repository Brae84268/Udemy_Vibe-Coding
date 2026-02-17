import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProjectDialog, type ProjectItem } from "@/app/components/project-dialog";

const placeholderProjects: ProjectItem[] = [
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

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/80 dark:bg-background/85" />
        </div>
        <div className="relative z-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            개발자 포트폴리오
          </p>
          <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            안녕하세요, 김브래 입니다
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            웹/앱 개발 결과물을 소개하는 공간입니다. 관심 있는 프로젝트를 아래에서
            확인해 보세요.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#projects">프로젝트 보기</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">연락하기</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="border-t border-border bg-muted/30 px-4 py-16"
      >
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            작업물
          </p>
          <h2 className="mb-10 text-2xl font-bold text-foreground sm:text-3xl">
            프로젝트
          </h2>
          <ProjectDialog projects={placeholderProjects} />
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            저를 소개합니다
          </p>
          <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
            소개
          </h2>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-56 sm:w-72">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80"
                alt="협업 이미지"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 288px"
              />
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                여기에 자신의 소개, 관심 분야, 사용하는 기술 스택, 경력 등을
                자유롭게 작성하세요. 여러 문단으로 나누어도 됩니다.
              </p>
              <p className="leading-relaxed">
                예: 프론트엔드/백엔드/풀스택 개발에 관심이 있고, 사용자 경험과 코드
                품질을 중요하게 생각합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="border-t border-border bg-muted/30 px-4 py-16"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            함께 일해요
          </p>
          <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
            연락처
          </h2>
          <p className="mb-8 text-muted-foreground">
            프로젝트 문의나 협업 제안은 아래 링크로 연락 주세요.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a href="mailto:your@email.com">이메일 보내기</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
