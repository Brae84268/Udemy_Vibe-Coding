import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// 서버 전용 변수 사용 → Vercel 등에서 런타임에 주입되므로 배포 후에도 연동 가능
const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;
