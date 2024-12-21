import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin", // Redirect here if not authenticated
  },
});

export const config = {
  matcher: ["/patient/:path*", "/agent/:path*"], // Protect these routes
};
