import { NextRequest, NextResponse } from "next/server";
import {
  getGuestbookEntries,
  addGuestbookEntry,
} from "@/lib/guestbook-store";

/**
 * GET /api/guestbook
 * 방명록 목록 조회 (최신순)
 */
export async function GET() {
  const entries = getGuestbookEntries();
  return NextResponse.json({ entries });
}

/**
 * POST /api/guestbook
 * 방명록 작성
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

    const entry = addGuestbookEntry(name, message);
    const entries = getGuestbookEntries();

    return NextResponse.json({ entry, entries });
  } catch {
    return NextResponse.json(
      { error: "잘못된 요청입니다." },
      { status: 400 }
    );
  }
}
