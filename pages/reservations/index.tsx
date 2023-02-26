import { Grid } from '@mui/material'
import { MainLayout } from '@/layouts/MainLayout'
import { BookCard, BookInfo } from '@/components/BookCard'

const Books_Reserve_Info: BookInfo[] = [
  { title: 'プログラミング言語Ruby', status: '予約中', date: '2023-02-19', href: '/books/1', imageUrl: '/images/no-image.jpg' },
  { title: 'プログラミング言語PHP', status: '予約中', date: '2023-02-22', href: '/books/2', imageUrl: '/images/no-image.jpg' },
  { title: 'プログラミング言語JavaScript', status: '予約中', date: '2023-02-21', href: '/books/3', imageUrl: '/images/no-image.jpg' },
  { title: 'プログラミング言語Python', status: '予約中', date: '2023-02-25', href: '/books/4', imageUrl: '/images/no-image.jpg' },
]

const sortBooks = Books_Reserve_Info.sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())

export default function Books() {
  return (
    <MainLayout>
      <Grid container spacing={2}>
        <BookCard {...{ books: sortBooks }} />
      </Grid>
    </MainLayout>
  )
}
