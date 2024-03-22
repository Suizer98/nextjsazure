// pages/api/login.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Assuming passwords are hashed with bcryptjs

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    console.log(email, password);

    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      // Authentication successful
      return res.status(200).json({ name: user.name });
    } else {
      // Authentication failed
      return res.status(401).json({ error: "Authentication failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
