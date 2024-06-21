// pages/api/pingDB.ts
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Perform your database ping operation here
    await (prisma as any).$queryRaw`SELECT 1`
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error pinging database:', error)
    return res.status(500).json({ success: false, error: 'Failed to ping database' })
  }
}
