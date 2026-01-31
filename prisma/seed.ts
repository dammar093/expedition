import { PrismaClient } from "../src/app/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "dammarrana093@gmail.com";

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("✅ Admin user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("123456789", 10);

  const adminUser = await prisma.user.create({
    data: {
      name: "Dammar Singh Rana",
      email: email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("🔥 Admin user created:", adminUser.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
