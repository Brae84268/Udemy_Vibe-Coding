import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * 런타임에 환경 변수를 읽어 Supabase 클라이언트 반환.
 * Vercel 등에서는 요청 시점에 env가 주입되므로 lazy 초기화로 연동 보장.
 */
function getSupabase(): SupabaseClient | null {
  if (client !== null) return client;
  const url =
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    "";
  const anonKey =
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "";
  if (url && anonKey) {
    client = createClient(url, anonKey);
  }
  return client;
}

export { getSupabase };
