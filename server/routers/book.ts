import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import prisma from '@/lib/prisma'
import { TRPCError } from '@trpc/server'
import dayjs from 'dayjs'

export const bookRouter = router({
  getBooks: protectedProcedure.query(async ({ ctx }) => {
    try {
      const booksInfo = await prisma.book.findMany({
        select: {
          title: true,
          imageUrl: true,
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
      console.debug(booksInfo)

      /**
       * - 貸出中 = lendingsの値があれば貸出中
       * - 予約中 = 自分が予約しているかどうか
       * - 借りている =  自分が借りているかどうか
       * - 貸出可能 = lengingsに値がなければ貸出可能
       */
      const userEmail = ctx.session.user?.email !== null && ctx.session.user?.email !== undefined ? ctx.session.user.email : ''
      const userInfo = await prisma.user.findFirst({
        where: {
          email: userEmail,
        },
      })
      for (const book of booksInfo) {
        if (book.lendings.length === 0) {
          return { status: '貸出可能', title: book.title, imageUrl: book.imageUrl }
        } else if (book.lendings.length > 0) {
          if (userInfo?.id === null) {
            return { status: '貸出中', title: book.title, imageUrl: book.imageUrl }
          } else {
            return { status: '現在借りています', title: book.title, imageUrl: book.imageUrl }
          }
        } else if (book.reservetions.length > 0) {
          if (userInfo?.id !== null) {
            return { status: '予約しています', title: book.title, imageUrl: book.imageUrl }
          }
        } else {
          return { status: '値が見つかりません' }
        }
      }
    } catch {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: '本の一覧を取得できませんでした。もう一度お試しください。',
      })
    }
  }),
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
