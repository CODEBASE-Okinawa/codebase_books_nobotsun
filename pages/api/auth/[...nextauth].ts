import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
// import prisma from '../../../lib/prisma'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/**
 * ログイン認証します。
 * @param credentials email, password
 * @returns
 */
const checkUser = async (credentials: any) => {
  const user = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    },
  })

  // if (user?.password !== undefined) {
  const isCompare = await bcrypt.compare(credentials.password, user?.password!)
  // }

  if (credentials.email === user?.email && isCompare) {
    return user
  } else {
    return null
  }
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler

const options = {
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // ここをDBから取得したユーザー情報に変更する
        const user = checkUser(credentials)

        if (user !== null) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  secret: process.env.SECRET,
}
