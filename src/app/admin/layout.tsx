// app/(admin)/layout.tsx
import SidebarAdmin from "@/components/admin/sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarAdmin />
      <main className="ml-64 w-full min-h-screen bg-blue-50 p-6">
        <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
          {children}
        </ProtectedRoute>
      </main>
    </div>
  );
}
