import bcrypt from "bcryptjs";

export async function hashedPassword(password: string) {
  const saltRounds = Number(process.env.SALT_ROUND) || 10;
  return await bcrypt.hash(password, saltRounds);
}
