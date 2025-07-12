// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SekolahKu",
  description: "Aplikasi manajemen sekolah berbasis Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gradient-to-b from-blue-50 to-white text-gray-900 min-h-screen flex flex-col scroll-smooth">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
