// app/(admin)/layout.tsx
import SidebarAdmin from "@/components/admin/sidebar";
import { withAuth } from "@/lib/withAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return withAuth(
    ["superadmin", "admin"],
    <div className="flex">
      <SidebarAdmin />
      <main className="ml-64 w-full min-h-screen bg-blue-50 p-6">
        {children}
      </main>
    </div>
  );
}
