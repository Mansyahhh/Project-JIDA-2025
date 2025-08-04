// src/app/admin/layout.tsx
import SidebarAdmin from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarAdmin />
      <main className="ml-64 w-full min-h-screen bg-blue-50 p-6">
        {children}
      </main>
    </div>
  );
}
