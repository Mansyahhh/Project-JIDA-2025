"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const hideNavbar =
    pathname.startsWith("/login") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/siswa");

  useEffect(() => {
    const halamanPrivat =
      pathname.startsWith("/admin") || pathname.startsWith("/siswa");

    if (!halamanPrivat) return;

    if (typeof window === "undefined") return;

    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : {};

    if (!user.role) {
      router.push("/login");
    }

    if (
      pathname.startsWith("/siswa") &&
      user.role !== "siswa" &&
      user.role !== "admin"
    ) {
      router.push("/login");
    }

    if (pathname.startsWith("/admin") && user.role !== "admin") {
      router.push("/login");
    }
  }, [pathname, router]);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
