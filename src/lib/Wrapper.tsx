"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Untuk debugging (opsional, bisa hapus di production)
  console.log("🚦 PATHNAME:", pathname);

  const hideNavbar =
    pathname.startsWith("/login") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/siswa");

  useEffect(() => {
    // Cegah error localStorage di server
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
  }, [pathname, router]); // ✅ tambahkan router ke dependencies

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
