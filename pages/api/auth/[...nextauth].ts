import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prisma'

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler

const options = {
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        username: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // ここをDBから取得したユーザー情報に変更する
        const user = { id: '1', name: 'test', email: 'test@example.com', password: 'password', admin: false }

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  secret: process.env.SECRET,
}
