import { NextRequest } from "next/server";
import { success, error } from "@/lib/api-response";
import { prisma } from "@/lib/prisma"; // your Prisma client
import crypto from "crypto";

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Send OTP for password reset
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Email not found
 *       500:
 *         description: Server error
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return error({ status: 400, message: "Email is required" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return error({ status: 400, message: "Email not registered" });
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in DB with expiry (e.g., 5 mins)
    await prisma.otp.create({
      data: {
        userId: user.id,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      },
    });

    // TODO: Send OTP via email/SMS
    console.log(`OTP for ${email}: ${otp}`);

    return success({ status: 200, message: "OTP sent successfully" });
  } catch (err: any) {
    return error({ status: 500, message: err.message || "Something went wrong" });
  }
}
