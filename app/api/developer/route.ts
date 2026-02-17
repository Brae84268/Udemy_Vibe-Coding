import { NextResponse } from "next/server";
import { developerProfile, projects } from "@/lib/portfolio-data";

/**
 * GET /api/developer
 *
 * 웹사이트 방문 없이 개발자 소개와 포트폴리오를 JSON으로 제공합니다.
 * - 어떤 개발자인지 (이름, 타이틀, 소개, 스킬, 연락처)
 * - 어떤 포트폴리오를 해왔는지 (프로젝트 목록)
 */
export async function GET() {
  const payload = {
    developer: {
      name: developerProfile.name,
      title: developerProfile.title,
      shortBio: developerProfile.shortBio,
      bio: developerProfile.bio,
      skills: developerProfile.skills,
      contact: developerProfile.contact,
    },
    projects: projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      detailDescription: p.detailDescription,
      tags: p.tags,
      githubUrl: p.githubUrl,
      portfolioUrl: p.portfolioUrl,
      // image는 외부 URL이므로 API에서도 포함 (선택)
      image: p.image,
    })),
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
