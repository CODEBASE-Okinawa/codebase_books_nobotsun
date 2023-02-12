import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const result = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      admin: false,
    },
  })
  res.json(result)
}
