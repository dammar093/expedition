import { NextResponse } from "next/server";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expediton Api",
      version: "1.0.0",
      description: "Expediton  API docs",
    },
    servers: [{ url: "/api/v1" }],
  },
  apis: ["./src/app/api/v1/**/*.ts"], // adjust path
});

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
