import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { error, success } from "@/lib/api-response";


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and validate credentials
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
 *         description: Login successful, JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     jwt_token:
 *                       type: string
 *       400:
 *         description: Missing email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Email and password are required
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return error({ status: 400, message: "Email and password are required" },)
    }

    // 👇 Example: sign JWT token (replace with real auth check)
    const jwtToken = jwt.sign(
      { email },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1h" }
    );

    return success({
      status: 200,
      message: "Login successful",
      data: { jwt_token: jwtToken },
    },)
  } catch (err: any) {
    return error({
      status: 500,
      message: "Something went wrong"
    })
  }
}
