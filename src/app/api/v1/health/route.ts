import { success } from "@/lib/api-response";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check the health of api 
 *     tags:
 *       - Health
 *    
 *     responses:
 *       200:
 *         description: Sever is running
 */

export function GET(req: NextRequest, res: NextResponse) {
  return success({
    data: null,
    message: "Server is running",
    status: 200
  })
}