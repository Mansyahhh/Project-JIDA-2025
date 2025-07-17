// components/admin/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBill,
  FaSignOutAlt,
} from "react-icons/fa";

const menu = [
  { href: "/admin", label: "Beranda", icon: <FaHome /> },
  { href: "/admin/siswa-crud", label: "Data Siswa", icon: <FaUsers /> },
  { href: "/admin/guru", label: "Data Guru", icon: <FaChalkboardTeacher /> },
  { href: "/admin/pembayaran", label: "Pembayaran", icon: <FaMoneyBill /> },
];

export default function SidebarAdmin() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-md flex flex-col">
      <div className="text-center py-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-700">Admin Panel</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
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
        <button className="flex items-center gap-3 text-red-600 hover:text-red-800">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}
