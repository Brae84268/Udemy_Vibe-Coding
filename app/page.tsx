import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProjectDialog } from "@/app/components/project-dialog";
import { ApiLabSection } from "@/app/components/api-lab-section";
import { developerProfile, projects } from "@/lib/portfolio-data";

export default function Home() {
  const { name, shortBio, bio, contact } = developerProfile;
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
            안녕하세요, {name} 입니다
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            {shortBio}
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
          <ProjectDialog projects={projects} />
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
              {bio.map((paragraph, i) => (
                <p key={i} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* API 실습 */}
      <ApiLabSection />

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
              <a href={`mailto:${contact.email}`}>이메일 보내기</a>
            </Button>
            {contact.github && (
              <Button variant="outline" size="lg" asChild>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
            )}
            {contact.linkedin && (
              <Button variant="outline" size="lg" asChild>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
