import { date, z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import prisma from '@/lib/prisma'
import { TRPCError } from '@trpc/server'

export const lendingRouter = router({
  // 本の貸し出し登録
  create: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        lendStartAt: z.string().datetime(),
        lendEndAt: z.string().datetime(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userEmail = ctx.session.user?.email !== null && ctx.session.user?.email !== undefined ? ctx.session.user.email : ''
        const userInfo = await prisma.user.findFirst({
          where: {
            email: userEmail,
          },
        })
        await prisma.lending.create({
          data: {
            userId: userInfo?.id,
            bookId: input.bookId,
            lendStartAt: input.lendStartAt,
            lendEndAt: input.lendEndAt,
          },
        })
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '値を登録できませんでした。もう一度試してください。',
        })
      }
      return { text: '登録完了' }
    }),
})
