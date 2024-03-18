import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle POST requests - Create a new user
  if (req.method === 'POST') {
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
      res.status(500).json({ error: 'Failed to create user' });
    }
  } 
  // Handle GET requests - List all users
  else if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  } 
  // Respond with 405 Method Not Allowed if the request method is not supported
  else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
