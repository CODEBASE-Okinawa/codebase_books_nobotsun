import { router } from '../trpc'
import { bookRouter } from './book'
import { lendingRouter } from './lending'
import { reservetionRoute } from './reservation'

export const appRouter = router({
  book: bookRouter,
  lending: lendingRouter,
  reservation: reservetionRoute,
})

// export type definition of API
export type AppRouter = typeof appRouter
