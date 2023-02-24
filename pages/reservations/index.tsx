import { Grid } from '@mui/material'
import { MainLayout } from '@/layouts/MainLayout'
import { BookCard, BookInfo } from '@/components/BookCard'

const Books_Reserve_Info: BookInfo[] = [
  { title: 'プログラミング言語Ruby', state: '予約中', date: '2023-02-19', href: '/books/1' },
  { title: 'プログラミング言語PHP', state: '予約中', date: '2023-02-22', href: '/books/2' },
  { title: 'プログラミング言語JavaScript', state: '予約中', date: '2023-02-21', href: '/books/3' },
  { title: 'プログラミング言語Python', state: '予約中', date: '2023-02-25', href: '/books/4' },
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
