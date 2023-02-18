import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { data } = req.body
  console.debug(data.name, data.email, data.password)
  const hashedPassword = await bcrypt.hash(data.password, 10)

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
