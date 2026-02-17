This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Supabase DB 연동 (필수)

배포된 사이트에서 방명록·좋아요·개발자 정보가 나오려면 **환경 변수**를 설정해야 합니다.

1. [Vercel 대시보드](https://vercel.com) → 해당 프로젝트 → **Settings** → **Environment Variables**
2. 아래 두 개 추가 (Production / Preview / Development 원하는 환경에 체크):

| Name | Value |
|------|--------|
| `SUPABASE_URL` | Supabase 프로젝트 URL (예: `https://xxxx.supabase.co`) |
| `SUPABASE_ANON_KEY` | Supabase **Project API Key** 중 **anon public** 키 |

3. 저장 후 **Redeploy** (Deployments → 맨 위 배포 옆 ⋮ → Redeploy).

Supabase 키 확인: [Supabase Dashboard](https://supabase.com/dashboard) → 프로젝트 선택 → **Settings** → **API** → Project URL, anon public key.
