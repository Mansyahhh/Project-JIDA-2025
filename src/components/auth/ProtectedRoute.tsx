"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RootState } from "@/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ("admin" | "superadmin" | "siswa")[]; // bisa 1 atau lebih
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (!allowedRoles.includes(role)) {
      router.push("/login");
    } else {
      setIsAuthorized(true); // ✅ user memenuhi syarat
    }
  }, [isLoggedIn, role]);

  // Sambil redirect, jangan render apa pun
  if (!isAuthorized) return null;

  return <>{children}</>;
}
