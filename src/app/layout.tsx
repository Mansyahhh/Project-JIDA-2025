import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Wrapper from "@/lib/Wrapper";
import { Toaster } from "sonner";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { store } from "@/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SekolahKu",
  description: "Aplikasi manajemen sekolah berbasis Next.js",
};

// 👇 Buat wrapper client component
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={inter.className}>
      <body className="bg-gradient-to-b from-blue-50 to-white text-gray-900 min-h-screen scroll-smooth">
        <ReduxProvider>
          <Wrapper>
            {children}
            <Toaster position="top-right" richColors />
          </Wrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
