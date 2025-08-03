import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("MIDDLEWARE CALLED", req.nextUrl.pathname);
    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("MIDDLEWARE TOKEN", token);
        return !!token; // atau cek token?.role === "admin"
      },
    },
  }
);

export const config = { matcher: ["/admin/:path*"] };
