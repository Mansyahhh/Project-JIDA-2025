// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // hanya yang sudah login
  },
});

export const config = {
  matcher: ["/admin/:path*"], // semua route /admin dan turunannya
};
