import { error, success } from "@/lib/api-response";
import { registerSchema } from "@/schema/auth";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma"
import { hashedPassword } from "@/utils/hash-password";

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
    const body = await req.json()
    console.log(body)
    const validFields = registerSchema.safeParse(body)
    if (validFields?.error) return error({ status: 400, message: "Invalid field error" });
    const { name, email, password } = validFields.data;

    if (!name || !email || !password) {
      return error({ status: 400, message: "Name, email, and password are required" });
    }

    // checking if the uer exist or not with the email 
    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) {
      error({
        status: 400,
        message: "User already register"
      })
    }

    //hashed the password 
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashedPassword(password)
      }
    })

    return success({
      status: 201,
      message: "User registered successfully",
      data: null,
    });
  } catch (err: any) {
    return error({ status: 500, message: err.message || "Something went wrong" });
  }
}
