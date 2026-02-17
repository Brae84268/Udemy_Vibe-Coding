import { NextRequest, NextResponse } from "next/server";
import {
  getGuestbookEntries,
  deleteGuestbookEntry,
} from "@/lib/guestbook-store";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * DELETE /api/guestbook/[id]
 * 방명록 메시지 삭제
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

  const deleted = deleteGuestbookEntry(id);
  if (!deleted) {
    return NextResponse.json(
      { error: "해당 방명록을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const entries = getGuestbookEntries();
  return NextResponse.json({ entries });
}
