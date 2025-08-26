import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pack&Go 旅行社",
  description: "包團旅遊、客製旅遊、郵輪、機票、飯店與中國簽證服務",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body className="bg-black text-white">
        <header className="border-b border-neutral-800">
          <div className="container flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              {/* Logo placeholder; replace /logo.svg with your card logo */}
              <img src="/logo.svg" alt="Pack&Go" className="h-8 w-auto" />
              <span className="font-semibold tracking-wide">Pack&Go 旅行社</span>
            </div>
            <nav className="flex gap-6 text-sm">
              <a href="/">首頁</a>
              <a href="/services">服務</a>
              <a href="/trips">行程</a>
              <a href="/promotions">優惠</a>
              <a href="/contact">聯絡我們</a>
              <a href="/admin" className="opacity-60 hover:opacity-100">管理員</a>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="border-t border-neutral-800">
          <div className="container py-6 text-sm opacity-75">
            © {new Date().getFullYear()} Pack&Go 旅行社. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

