import { NextResponse } from "next/server";
import { recommendations } from "@/lib/recommendations-data";

/**
 * GET /api/recommend
 * 오늘의 한 줄 추천 문구를 랜덤으로 1개 반환
 */
export async function GET() {
  const index = Math.floor(Math.random() * recommendations.length);
  const text = recommendations[index];
  return NextResponse.json({ text, index: index + 1, total: recommendations.length });
}
