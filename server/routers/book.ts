import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import prisma from '@/lib/prisma'
import { TRPCError } from '@trpc/server'

export const bookRouter = router({
  // 本の貸し出し、予約ずみ一覧を取得
  getEvent: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
      })
    )
    .output(
      z.array(
        z.object({
          title: z.string(),
          start: z.date(),
          end: z.date(),
        })
      )
    )
    .query(async ({ input }) => {
      try {
        const lendingAndReservationEvent = await prisma.book.findMany({
          where: {
            id: input.bookId,
          },
          select: {
            lendings: {
              select: {
                startAt: true,
                endAt: true,
              },
            },
            reservetions: {
              select: {
                startAt: true,
                endAt: true,
              },
            },
          },
        })

        // outputと同じデータ構造に変更する処理
        const events = []
        for (const event of lendingAndReservationEvent) {
          for (const lending of event.lendings) {
            events.push({ title: '貸出中', start: lending.startAt, end: lending.endAt })
          }
          for (const reservation of event.reservetions) {
            events.push({ title: '予約中', start: reservation.startAt, end: reservation.endAt })
          }
        }
        return events
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '値を取得できませんでした。もう一度お試しください。',
        })
      }
    }),
})
