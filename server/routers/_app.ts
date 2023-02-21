import { router } from '../trpc'
import { lendingRouter } from './lending'

export const appRouter = router({
  lending: lendingRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
