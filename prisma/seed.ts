import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});



export async function main() {

  await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      name: 'Admin User',
    }
  });

}

main();