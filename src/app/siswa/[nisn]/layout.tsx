// src/app/siswa/[nisn]/layout.tsx

import SidebarSiswa from "@/components/siswa/SidebarSiswa";

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fix di kiri */}
      <div className="w-64 shrink-0">
        <SidebarSiswa />
      </div>

      {/* Konten dashboard siswa */}
      <main className="flex-1 bg-blue-50 p-6 overflow-hidden">{children}</main>
    </div>
  );
}
