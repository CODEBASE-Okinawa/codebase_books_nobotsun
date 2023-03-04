import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import prisma from '@/lib/prisma'
import { TRPCError } from '@trpc/server'
import dayjs from 'dayjs'

const reservationInfo = z.object({
  title: z.string(),
  imageUrl: z.string(),
  events: z.array(
    z.object({
      status: z.string(),
      start: z.string(),
    })
  ),
})

export const reservetionRoute = router({
  // 本の予約登録
  create: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        startAt: z.string().transform((arg) => new Date(arg)),
        endAt: z.string().transform((arg) => new Date(arg)),
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

  getEvent: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
      })
    )
    .output(reservationInfo)
    .query(async ({ input }) => {
      try {
        const reservationEvent = await prisma.book.findMany({
          where: {
            id: input.bookId,
          },
          select: {
            title: true,
            imageUrl: true,
            reservetions: {
              select: {
                startAt: true,
              },
            },
          },
        })

        // outputと同じデータ構造に変更する処理
        let bookTifle = ''
        let bookImageUrl = ''
        for (const event of reservationEvent) {
          bookTifle = event.title
          bookImageUrl = event.imageUrl
        }
        const events = []

        for (const event of reservationEvent) {
          for (const reservation of event.reservetions) {
            const formatedStartAt = dayjs(reservation.startAt).format('YYYY-MM-DD')
            events.push({ status: '予約中', start: formatedStartAt })
          }
        }

        const reservationInfo = {
          title: bookTifle,
          imageUrl: bookImageUrl,
          events: events,
        }

        return reservationInfo
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '値を取得できませんでした。もう一度お試しください。',
        })
      }
    }),
})
