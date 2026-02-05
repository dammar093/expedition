import { signIn } from "@/auth";
import { error, success } from "@/lib/api-response";
import { AuthError } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth"

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user using email and password and return JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */


export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const session = await auth()
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (!res) {
      return error({ status: 401, message: "Invalid credentials" })
    }

    const token = session?.user.token
    return success({
      message: "Login successful", data: {
        token: token?.jti
      }
    })
  } catch (err: any) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return error({
            message: "Invalid credentials",
            status: 401
          })
        default: return error({
          message: "Something went wrong",
          status: 500
        })
      }
    }
    throw err
  }
}
