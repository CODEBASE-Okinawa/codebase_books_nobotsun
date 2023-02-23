import { router } from '../trpc'
import { bookRouter } from './book'
import { lendingRouter } from './lending'

export const appRouter = router({
  book: bookRouter,
  lending: lendingRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
