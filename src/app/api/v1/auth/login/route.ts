import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { success, error } from "@/lib/api-response";

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
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return error({ status: 400, message: "Email and password are required" });
    }

    // Simulate login
    const jwtToken = jwt.sign(
      { email },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1h" }
    );

    return success({
      status: 200,
      message: "Login successful",
      data: { jwt_token: jwtToken },
    });
  } catch (err: any) {
    return error({ status: 500, message: err.message || "Something went wrong" });
  }
}
