import { NextRequest } from "next/server";
import { success, error } from "@/lib/api-response";
import { prisma } from "@/lib/prisma"; // assuming you have Prisma
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
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
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               otp:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *               - otp
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Missing required fields or OTP invalid
 *       500:
 *         description: Server error
 */
export async function POST(req: NextRequest) {
  try {
    const { email, password, confirmPassword, otp } = await req.json();

    if (!email || !password || !confirmPassword || !otp) {
      return error({ status: 400, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return error({ status: 400, message: "Passwords do not match" });
    }

    // Verify OTP (replace this with your real OTP verification logic)
    const isValidOtp = otp === "123456"; // example
    if (!isValidOtp) {
      return error({ status: 400, message: "Invalid OTP" });
    }

    // Update user password in DB
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return success({ status: 200, message: "Password reset successfully" });
  } catch (err: any) {
    return error({ status: 500, message: err.message || "Something went wrong" });
  }
}
