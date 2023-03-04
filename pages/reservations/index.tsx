import { Grid } from '@mui/material'
import { MainLayout } from '@/layouts/MainLayout'
import { BookCard, BookInfo } from '@/components/BookCard'
import { trpc } from '@/utils/trpc'

export default function Books() {
  const getReservation = trpc.reservation.getEvent.useQuery({ bookId: 'clejnctos000cpiand94ldtdc' })

  const reservationBooks: BookInfo[] = []
  getReservation.data?.events.forEach((event) => {
    reservationBooks.push({
      title: getReservation.data?.title,
      imageUrl: getReservation.data?.imageUrl,
      status: event.status,
      start: event.start,
    })
  })
  return (
    <MainLayout>
      <Grid container spacing={2}>
        {getReservation.data && <BookCard books={reservationBooks} />}
      </Grid>
    </MainLayout>
  )
}
