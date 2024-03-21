import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
// import nextCors from "nextjs-cors";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Run the CORS middleware
  // await nextCors(req, res, {
  // Options
  // methods: ["GET", "POST"],
  // origin: "*",
  // origin: "https://suizerlyciawedding.netlify.app", // Specify the origin to allow
  // optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  // });

  // Handle POST requests - Create a new user
  if (req.method === "POST") {
    const { name, pax, allergic } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          pax,
          allergic,
        },
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  }
  // Handle GET requests - List all users, but require a correct 'key' query parameter
  else if (req.method === "GET") {
    // const { key } = req.query;
    // const correctKey = process.env.PW;

    // Proceed only if the 'key' query parameter exists and matches the expected key
    // if (key && key === correctKey) {
    //   try {
    //     const users = await prisma.user.findMany();
    //     res.status(200).json(users);
    //   } catch (error) {
    //     res.status(500).json({ error: "Failed to retrieve users" });
    //   }
    // } else {
    //   // If 'key' is missing or does not match, respond with 401 Unauthorized
    //   res
    //     .status(401)
    //     .json({ error: "Unauthorized: Access requires a valid API key" });
    // }

    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  }
  // Respond with 405 Method Not Allowed if the request method is not supported
  else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
