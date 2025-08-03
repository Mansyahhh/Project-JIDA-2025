//src/lib/withAuth.ts
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function withAuth(allowedRoles: string[], page: React.ReactNode) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    redirect("/login");
  }
  return page;
}
