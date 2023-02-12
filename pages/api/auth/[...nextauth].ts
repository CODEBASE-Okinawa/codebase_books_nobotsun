import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { sha256 } from 'crypto-hash'
import prisma from '../../../lib/prisma'

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
  const hashedPassword = await sha256(credentials.password)

  if (credentials.email === user?.email && hashedPassword === user?.password) {
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
