import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      console.log("=== TOKEN DARI MIDDLEWARE ===", token); // <-- debug log
      return token?.role === "admin" || token?.role === "superadmin";
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
