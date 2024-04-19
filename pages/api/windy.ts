import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "data", "time_step_0_small.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Read wind data from local JSON file
      const data = fs.readFileSync(filePath, "utf-8");
      const windData = JSON.parse(data);

      return res.status(200).json(windData);
    } catch (error) {
      console.error("Error reading wind data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
