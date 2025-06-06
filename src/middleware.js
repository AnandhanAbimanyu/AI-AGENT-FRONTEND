import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/social-signin",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    // Add other protected routes here
  ],
}; 
