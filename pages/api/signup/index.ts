import prisma from '@/lib/prisma'
import { sha256 } from 'crypto-hash'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { data } = req.body
  console.debug(data.name, data.email, data.password)
  const hashedPassword = await sha256(data.password)

  const result = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      admin: false,
    },
  })
  res.json(result)
}
