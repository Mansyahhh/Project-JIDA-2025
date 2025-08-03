import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("MIDDLEWARE CALLED", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("MIDDLEWARE TOKEN", token);
        // Hanya allow admin & superadmin
        return token?.role === "admin" || token?.role === "superadmin";
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
