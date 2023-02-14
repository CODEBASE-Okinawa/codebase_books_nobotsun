import { Grid } from '@mui/material'
import { MainLayout } from '@/layouts/MainLayout'
import { BookCard } from '@/components/BookCard'

export default function Books() {
  return (
    <MainLayout>
      <Grid item xs={12} md={4} lg={3}>
        <BookCard />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <BookCard />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <BookCard />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <BookCard />
      </Grid>
    </MainLayout>
  )
}
