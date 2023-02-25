import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import prisma from '@/lib/prisma'
import { TRPCError } from '@trpc/server'
import dayjs from 'dayjs'

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
          start: z.string(),
          end: z.string(),
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
            const formatedStartAt = dayjs(lending.startAt).format('YYYY-MM-DD')
            const formatedEndAt = dayjs(lending.endAt).format('YYYY-MM-DD')
            events.push({ title: '貸出中', start: formatedStartAt, end: formatedEndAt })
          }
          for (const reservation of event.reservetions) {
            const formatedStartAt = dayjs(reservation.startAt).format('YYYY-MM-DD')
            const formatedEndAt = dayjs(reservation.endAt).format('YYYY-MM-DD')
            events.push({ title: '予約中', start: formatedStartAt, end: formatedEndAt })
          }
        }
        console.debug(events)
        return events
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '値を取得できませんでした。もう一度お試しください。',
        })
      }
    }),
})
