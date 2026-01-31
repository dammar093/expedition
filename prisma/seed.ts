import { hashedPassword } from "@/utils/hash-password";
import { prisma } from '@/lib/prisma';



async function main() {

  const user = await prisma.user.upsert({
    where: { email: "dammarrana093@gmail.com" },
    update: {},
    create: {
      name: "Dammar Singh Rana",
      email: "dammarrana093@gmail.com",
      password: await hashedPassword("123456789"),
      role: "ADMIN",
    },
  });

  console.log("Seeded user:", user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
