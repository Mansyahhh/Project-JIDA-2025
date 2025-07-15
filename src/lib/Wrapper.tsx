"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Tambahkan log di sini untuk debugging
  console.log("🚦 PATHNAME:", pathname);

  const hideNavbar =
    pathname.startsWith("/login") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/siswa");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

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
  }, [pathname]);

  return (
    <>
      {!hideNavbar && <Navbar />}

      {children}
    </>
  );
}
