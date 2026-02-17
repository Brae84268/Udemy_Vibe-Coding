import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/developer
 * 개발자 소개 + 포트폴리오 - Supabase developer_profiles, projects 테이블
 */
export async function GET() {
  if (!supabase) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }
  const { data: profile, error: profileError } = await supabase
    .from("developer_profiles")
    .select("name, title, short_bio, bio, skills, contact")
    .limit(1)
    .maybeSingle();

  if (profileError || !profile) {
    return NextResponse.json(
      { error: "개발자 프로필을 불러올 수 없습니다." },
      { status: 500 }
    );
  }

  const { data: profileRow } = await supabase
    .from("developer_profiles")
    .select("id")
    .limit(1)
    .single();

  let projectsList: Array<{
    id: string;
    title: string;
    description: string;
    detailDescription?: string;
    tags: string[];
    image?: string;
    githubUrl?: string;
    portfolioUrl?: string;
  }> = [];

  if (profileRow?.id) {
    const { data: projectsData } = await supabase
      .from("projects")
      .select("id, title, description, detail_description, tags, image, github_url, portfolio_url")
      .eq("developer_profile_id", profileRow.id)
      .order("sort_order", { ascending: true });

    projectsList = (projectsData ?? []).map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      detailDescription: p.detail_description ?? undefined,
      tags: Array.isArray(p.tags) ? p.tags : [],
      image: p.image ?? undefined,
      githubUrl: p.github_url ?? undefined,
      portfolioUrl: p.portfolio_url ?? undefined,
    }));
  }

  const payload = {
    developer: {
      name: profile.name,
      title: profile.title,
      shortBio: profile.short_bio,
      bio: Array.isArray(profile.bio) ? profile.bio : [],
      skills: Array.isArray(profile.skills) ? profile.skills : [],
      contact:
        profile.contact && typeof profile.contact === "object"
          ? profile.contact
          : {},
    },
    projects: projectsList,
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
