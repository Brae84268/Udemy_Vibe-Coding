import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const VISITOR_ID_HEADER = "x-visitor-id";

/**
 * GET /api/like
 * 현재 좋아요 수 + 이 방문자의 좋아요 여부 - Supabase likes 테이블
 */
export async function GET(request: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ count: 0, liked: false });
  }
  const visitorId = request.headers.get(VISITOR_ID_HEADER) ?? "";

  const { count, error: countError } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true });

  if (countError) {
    return NextResponse.json({ count: 0, liked: false }, { status: 200 });
  }

  if (!visitorId) {
    return NextResponse.json({ count: count ?? 0, liked: false });
  }

  const { data: row } = await supabase
    .from("likes")
    .select("visitor_id")
    .eq("visitor_id", visitorId)
    .maybeSingle();

  return NextResponse.json({
    count: count ?? 0,
    liked: !!row,
  });
}

/**
 * POST /api/like
 * 좋아요 토글 - Supabase likes 테이블
 */
export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const visitorId = request.headers.get(VISITOR_ID_HEADER) ?? "";
  if (!visitorId) {
    return NextResponse.json(
      { error: "x-visitor-id 헤더가 필요합니다." },
      { status: 400 }
    );
  }

  const { data: existing } = await supabase
    .from("likes")
    .select("visitor_id")
    .eq("visitor_id", visitorId)
    .maybeSingle();

  if (existing) {
    await supabase.from("likes").delete().eq("visitor_id", visitorId);
    const { count } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true });
    return NextResponse.json({ count: count ?? 0, liked: false });
  }

  await supabase.from("likes").insert({ visitor_id: visitorId });
  const { count } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true });
  return NextResponse.json({ count: count ?? 1, liked: true });
}
