import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type RouteParams = { params: Promise<{ id: string }> };

function mapEntry(row: { id: string; name: string; message: string; created_at: string }) {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    createdAt: row.created_at,
  };
}

/**
 * DELETE /api/guestbook/[id]
 * 방명록 메시지 삭제 - Supabase guestbook 테이블
 */
export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { error: "id가 필요합니다." },
      { status: 400 }
    );
  }

  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const { error: deleteError } = await supabase
    .from("guestbook")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  const { data: list } = await supabase
    .from("guestbook")
    .select("id, name, message, created_at")
    .order("created_at", { ascending: false });

  return NextResponse.json({
    entries: (list ?? []).map(mapEntry),
  });
}
