"use client";

import { useEffect, useState } from "react";
import { FaHome, FaMoneyBill, FaLock, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SidebarSiswa() {
  const [nisn, setNisn] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedNisn = localStorage.getItem("nisn");
    if (storedNisn) setNisn(storedNisn);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-md fixed top-0 left-0 z-20 flex flex-col justify-between">
      <div>
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 text-center">
            SISWA
          </h2>
          <p className="text-center text-sm text-gray-500">SekolahKu</p>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <a
            href={`/siswa/${nisn}/dashboard`}
            className="flex items-center gap-3 px-4 py-2 text-blue-700 hover:bg-blue-50 rounded transition"
          >
            <FaHome /> Dashboard
          </a>
          <a
            href={`/siswa/${nisn}/pembayaran`}
            className="flex items-center gap-3 px-4 py-2 text-blue-700 hover:bg-blue-50 rounded transition"
          >
            <FaMoneyBill /> Pembayaran
          </a>
          <a
            href={`/siswa/${nisn}/ubah-password`}
            className="flex items-center gap-3 px-4 py-2 text-blue-700 hover:bg-blue-50 rounded transition"
          >
            <FaLock /> Ubah Password
          </a>
        </nav>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}
