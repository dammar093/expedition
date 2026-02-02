import { signOut } from "@/auth"; // Auth.js helper
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_REDIRECT_LOGIN_ROUTE } from "@/routes";
import { error } from "@/lib/api-response";

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user and clear session
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout successful
 *       500:
 *         description: Internal server error
 */
export async function GET(req: NextRequest) {
  try {
    // Server-side logout
    await signOut({
      redirect: true,
      redirectTo: DEFAULT_REDIRECT_LOGIN_ROUTE
    });

    // Redirect user to login page
    return NextResponse.redirect(DEFAULT_REDIRECT_LOGIN_ROUTE);
  } catch (err: any) {
    return error({
      message: "Something went wrong",
      status: 500,
    });
  }
}
