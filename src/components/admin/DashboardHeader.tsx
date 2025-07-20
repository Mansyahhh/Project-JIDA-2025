"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function DashboardHeader() {
  const { nama, role, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div>
      {isLoggedIn ? (
        <h2 className="text-xl font-semibold">
          Selamat datang, {nama} ({role})
        </h2>
      ) : (
        <h2 className="text-xl font-semibold">Selamat datang 👋</h2>
      )}
    </div>
  );
}
