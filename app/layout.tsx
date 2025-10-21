import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Newspaper } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "News CMS",
  description: "A simple CMS for managing news articles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold"
              >
                <Newspaper className="h-6 w-6" />
                <span className="text-xl">News CMS</span>
              </Link>
            </div>
          </header>
          <main className="container py-8">{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with Next.js, Supabase & shadcn/ui
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
