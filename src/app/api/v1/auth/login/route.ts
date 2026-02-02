import { signIn } from "@/auth";
import { error, success } from "@/lib/api-response";
import { AuthError } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth"

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and return JWT
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
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing email or password
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
    return success({ message: "Login successful", data: token })
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
