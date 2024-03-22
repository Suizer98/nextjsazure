// pages/api/users/index.tsx
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, name, password } = req.body;
    try {
      const passwordHash = bcrypt.hashSync(password, 10); // Hash the password
      // Creating a new user
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          passwordHash,
          authenticationType: "email_password", // Assuming authenticationType is set as "email_password" for POST requests
        },
      });
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user" });
    }
  } else if (req.method === "GET") {
    // Listing all users
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to retrieve users" });
    }
  } else {
    // Handling unsupported methods
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
