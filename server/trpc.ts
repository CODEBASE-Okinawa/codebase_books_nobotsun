import { initTRPC, TRPCError } from '@trpc/server'
import { Context } from './context'

const t = initTRPC.context<Context>().create()

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user?.email) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  })
})

export const middleware = t.middleware
export const router = t.router
// 認証処理が含まれていないバージョン
export const publicProcedure = t.procedure
// 認証処理が含まれているバージョン
export const protectedProcedure = t.procedure.use(isAuthed)
