import { NextRequest, NextResponse } from "next/server";
import { getLikeState, toggleLike } from "@/lib/like-store";

const VISITOR_ID_HEADER = "x-visitor-id";

/**
 * GET /api/like
 * 현재 좋아요 수 + 이 방문자의 좋아요 여부 조회
 * 헤더에 x-visitor-id 있으면 해당 방문자 기준 liked 반환
 */
export async function GET(request: NextRequest) {
  const visitorId = request.headers.get(VISITOR_ID_HEADER) ?? "";
  const state = getLikeState(visitorId);
  return NextResponse.json(state);
}

/**
 * POST /api/like
 * 좋아요 토글 (이미 좋아요면 취소, 아니면 추가)
 * 헤더에 x-visitor-id 필요
 */
export async function POST(request: NextRequest) {
  const visitorId = request.headers.get(VISITOR_ID_HEADER) ?? "";
  if (!visitorId) {
    return NextResponse.json(
      { error: "x-visitor-id 헤더가 필요합니다." },
      { status: 400 }
    );
  }
  const state = toggleLike(visitorId);
  return NextResponse.json(state);
}
