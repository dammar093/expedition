import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { success, error } from "@/lib/api-response";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user and return JWT
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing required fields
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return error({ status: 400, message: "Name, email, and password are required" });
    }

    // Simulate registration
    const jwtToken = jwt.sign(
      { name, email },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1h" }
    );

    return success({
      status: 201,
      message: "User registered successfully",
      data: { jwt_token: jwtToken },
    });
  } catch (err: any) {
    return error({ status: 500, message: err.message || "Something went wrong" });
  }
}
