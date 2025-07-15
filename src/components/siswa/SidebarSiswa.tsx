"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaUser, FaMoneyBill, FaLock, FaSignOutAlt } from "react-icons/fa";

export default function SidebarSiswa() {
  const pathname = usePathname();
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const nisn = user.nisn;

  const menu = [
    { href: `/siswa/${nisn}/dashboard`, label: "Dashboard", icon: <FaUser /> },
    {
      href: `/siswa/${nisn}/pembayaran`,
      label: "Pembayaran",
      icon: <FaMoneyBill />,
    },
    {
      href: `/siswa/${nisn}/ubah-password`,
      label: "Ubah Password",
      icon: <FaLock />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen bg-white border-r shadow fixed left-0 top-0 z-50">
      <div className="text-center py-5 border-b border-gray-200 p-4 font-bold text-blue-700 text-xl">
        <h2 className="text-lg font-bold text-blue-700">Siswa Panel</h2>
      </div>

      <nav className="px-4 space-y-2 mt-4">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-100 transition ${
              pathname === item.href
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-600 hover:text-red-800"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}
