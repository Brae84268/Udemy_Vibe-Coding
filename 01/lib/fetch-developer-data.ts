import { getSupabase } from "@/lib/supabase";
import type { DeveloperProfile, ProjectItem } from "@/lib/portfolio-data";
import {
  developerProfile as fallbackProfile,
  projects as fallbackProjects,
} from "@/lib/portfolio-data";

export type DeveloperData = {
  developerProfile: DeveloperProfile;
  projects: ProjectItem[];
};

/**
 * Supabase에서 개발자 프로필 + 프로젝트 조회. 실패 시 기존 더미 데이터 반환.
 */
export async function getDeveloperData(): Promise<DeveloperData> {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      developerProfile: fallbackProfile,
      projects: fallbackProjects,
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("developer_profiles")
    .select("name, title, short_bio, bio, skills, contact")
    .limit(1)
    .maybeSingle();

  if (profileError || !profile) {
    return {
      developerProfile: fallbackProfile,
      projects: fallbackProjects,
    };
  }

  const { data: profileRow } = await supabase
    .from("developer_profiles")
    .select("id")
    .limit(1)
    .single();

  let projectsList: ProjectItem[] = fallbackProjects;

  if (profileRow?.id) {
    const { data: projectsData } = await supabase
      .from("projects")
      .select("id, title, description, detail_description, tags, image, github_url, portfolio_url")
      .eq("developer_profile_id", profileRow.id)
      .order("sort_order", { ascending: true });

    if (projectsData?.length) {
      projectsList = projectsData.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        detailDescription: p.detail_description ?? undefined,
        tags: Array.isArray(p.tags) ? p.tags : [],
        image: p.image ?? "",
        githubUrl: p.github_url ?? undefined,
        portfolioUrl: p.portfolio_url ?? undefined,
      }));
    }
  }

  const developerProfile: DeveloperProfile = {
    name: profile.name,
    title: profile.title,
    shortBio: profile.short_bio,
    bio: Array.isArray(profile.bio) ? profile.bio : [],
    skills: Array.isArray(profile.skills) ? profile.skills : [],
    contact:
      profile.contact && typeof profile.contact === "object"
        ? (profile.contact as DeveloperProfile["contact"])
        : fallbackProfile.contact,
  };

  return { developerProfile, projects: projectsList };
}
