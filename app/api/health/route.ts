import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/**
 * GET /api/health
 * DB 연동 여부 확인 (Vercel 환경 변수 체크용).
 * 배포 후 이 URL로 호출해 supabase: true/false 확인.
 */
export async function GET() {
  const supabase = getSupabase();
  const hasUrl = !!(
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  );
  const hasKey = !!(
    process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return NextResponse.json({
    ok: !!supabase,
    supabase: !!supabase,
    env: {
      hasSupabaseUrl: hasUrl,
      hasSupabaseAnonKey: hasKey,
      hint: !hasUrl || !hasKey
        ? "Vercel → Settings → Environment Variables 에 SUPABASE_URL, SUPABASE_ANON_KEY 추가 후 Redeploy"
        : undefined,
    },
  });
}
