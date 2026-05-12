// middleware.ts
import { withAuth } from "next-auth/middleware"

// This middleware uses NextAuth.js's withAuth helper to protect routes.
// It will automatically redirect users to the login page (defined in the
// NextAuth config) if they are not authenticated.

export default withAuth;

// The config object specifies which routes the middleware should run on.
// Here, we are protecting all routes under "/dashboard".
export const config = {
  matcher: ["/dashboard/:path*"],
}
