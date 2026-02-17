import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "김브래 | 개발자 포트폴리오",
  description: "개발 결과물을 소개하는 포트폴리오 웹사이트입니다.",
};

const navLinks = [
  { href: "#hero", label: "홈" },
  { href: "#projects", label: "프로젝트" },
  { href: "#about", label: "소개" },
  { href: "#contact", label: "연락처" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m=window.matchMedia('(prefers-color-scheme: dark)');var d=document.documentElement;if(m.matches)d.classList.add('dark');else d.classList.remove('dark');m.addEventListener('change',function(e){e.matches?d.classList.add('dark'):d.classList.remove('dark');});})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
            <Button variant="ghost" size="sm" className="text-base font-semibold" asChild>
              <Link href="#hero">김브래</Link>
            </Button>
            <ul className="flex gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border py-6">
          <div className="mx-auto max-w-4xl px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} 김브래. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
