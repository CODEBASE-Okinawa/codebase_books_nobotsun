import { Grid } from '@mui/material'
import { MainLayout } from '@/layouts/MainLayout'
import { BookCard } from '@/components/BookCard'
import { trpc } from '@/utils/trpc'
import { useEffect } from 'react'

const Books_Infomation = [
  { title: 'プログラミング言語Ruby', state: '貸し出し中', date: '2023-02-19', href: '/books/1' },
  { title: 'プログラミング言語PHP', state: '予約中', date: '2023-02-19', href: '/books/2' },
  { title: 'プログラミング言語JavaScript', state: '借りている', date: '2023-02-19', href: '/books/3' },
  { title: 'プログラミング言語Python', state: '貸し出し可能', date: '2023-02-19', href: '/books/4' },
]

export default function Books() {
  const getBooks = trpc.book.getBooks.useQuery()

  useEffect(() => {
    console.debug(getBooks.data)
  }, [getBooks])

  return (
    <MainLayout>
      <Grid container spacing={2}>
        <BookCard {...{ books: Books_Infomation }} />
      </Grid>
    </MainLayout>
  )
}
