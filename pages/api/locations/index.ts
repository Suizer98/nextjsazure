import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Handle POST requests - Create a new location
  if (req.method === "POST") {
    const { lat, lon } = req.body;
    try {
      // Validate lat and lon are numbers
      if (typeof lat !== "number" || typeof lon !== "number") {
        return res
          .status(400)
          .json({ error: "Latitude and longitude must be valid numbers" });
      }

      const newLocation = await prisma.location.create({
        data: {
          lat,
          lon,
        },
      });
      res.status(200).json(newLocation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create location" });
    }
  }
  // Handle GET requests - List all locations
  else if (req.method === "GET") {
    try {
      const locations = await prisma.location.findMany();
      res.status(200).json(locations);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to retrieve locations" });
    }
  }
  // Respond with 405 Method Not Allowed if the request method is not supported
  else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
