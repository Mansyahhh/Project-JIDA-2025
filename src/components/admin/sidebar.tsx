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
  FaFileInvoiceDollar,
} from "react-icons/fa";

const menu = [
  { href: "/admin", label: "Dashboard", icon: <FaHome /> },
  { href: "/admin/data-siswa", label: "Data Siswa", icon: <FaUsers /> },
  {
    href: "/admin/data-guru",
    label: "Data Guru",
    icon: <FaChalkboardTeacher />,
  },
  { href: "/admin/tagihan", label: "Tagihan", icon: <FaFileInvoiceDollar /> }, // <-- Tambahan
  { href: "/admin/pembayaran", label: "Pembayaran", icon: <FaMoneyBill /> },
];

export default function SidebarAdmin() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-md flex flex-col">
      {/* Header */}
      <div className="text-center py-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-700">
          Admin Panel <br />
          <span className="text-green-600">SekolahKu</span>
        </h2>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 text-red-600 hover:text-red-800 transition-colors cursor-pointer">
          <FaSignOutAlt /> <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
