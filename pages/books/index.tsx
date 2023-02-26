import { Grid } from '@mui/material'
import { MainLayout } from '@/layouts/MainLayout'
import { BookCard } from '@/components/BookCard'
import { trpc } from '@/utils/trpc'

export default function Books() {
  const getBooks = trpc.book.getBooks.useQuery()

  return (
    <MainLayout>
      <Grid container spacing={2}>
        {getBooks.data && <BookCard books={getBooks.data} />}
      </Grid>
    </MainLayout>
  )
}
