import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function mapEntry(row: { id: string; name: string; message: string; created_at: string }) {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    createdAt: row.created_at,
  };
}

/**
 * GET /api/guestbook
 * 방명록 목록 조회 (최신순) - Supabase guestbook 테이블
 */
export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const { data, error } = await supabase
    .from("guestbook")
    .select("id, name, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({
    entries: (data ?? []).map(mapEntry),
  });
}

/**
 * POST /api/guestbook
 * 방명록 작성 - Supabase guestbook 테이블
 * body: { name: string, message: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !message) {
      return NextResponse.json(
        { error: "이름과 메시지를 모두 입력해 주세요." },
        { status: 400 }
      );
    }

    if (name.length > 50) {
      return NextResponse.json(
        { error: "이름은 50자 이내로 입력해 주세요." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "메시지는 500자 이내로 입력해 주세요." },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }
    const { data: inserted, error: insertError } = await supabase
      .from("guestbook")
      .insert({ name, message })
      .select("id, name, message, created_at")
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    const { data: list } = await supabase
      .from("guestbook")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false });

    return NextResponse.json({
      entry: mapEntry(inserted),
      entries: (list ?? []).map(mapEntry),
    });
  } catch {
    return NextResponse.json(
      { error: "잘못된 요청입니다." },
      { status: 400 }
    );
  }
}
