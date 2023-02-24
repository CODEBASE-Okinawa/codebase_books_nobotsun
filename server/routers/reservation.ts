import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import prisma from '@/lib/prisma'
import { TRPCError } from '@trpc/server'

export const reservetionRoute = router({
  create: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        startAt: z.string().datetime(),
        endAt: z.string().datetime(),
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
        await prisma.reservetion.create({
          data: {
            userId: userInfo?.id,
            bookId: input.bookId,
            startAt: input.startAt,
            endAt: input.endAt,
          },
        })
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '値を登録できませんでした。もう一度お試しください。',
        })
      }
    }),
})
