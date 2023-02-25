import { Grid } from '@mui/material'
import { MainLayout } from '@/layouts/MainLayout'
import { BookCard } from '@/components/BookCard'
import { trpc } from '@/utils/trpc'
import { useEffect } from 'react'

export default function Books() {
  const getBooks = trpc.book.getBooks.useQuery()

  useEffect(() => {
    console.debug(getBooks.data)
  }, [getBooks])

  return (
    <MainLayout>
      <Grid container spacing={2}>
        {getBooks.data && <BookCard books={getBooks.data} />}
      </Grid>
    </MainLayout>
  )
}
