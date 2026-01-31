import { NextRequest } from "next/server";
import { success, error } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /auth/verify-token:
 *   get:
 *     summary: Verify a secure token
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Secure verification token
 *     responses:
 *       200:
 *         description: Token verified successfully
 *       400:
 *         description: Invalid or expired token
 *       500:
 *         description: Server error
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) return error({ status: 400, message: "Token is required" });

    const tokenEntry = await prisma.verificationToken.findFirst({
      where: { token },
    });

    if (!tokenEntry) return error({ status: 400, message: "Invalid token" });
    if (tokenEntry.expiresAt < new Date())
      return error({ status: 400, message: "Token expired" });

    // Optionally mark token as used
    await prisma.verificationToken.update({
      where: { id: tokenEntry.id },
      data: { used: true },
    });

    return success({ status: 200, message: "Token verified successfully" });
  } catch (err: any) {
    return error({ status: 500, message: err.message || "Something went wrong" });
  }
}
