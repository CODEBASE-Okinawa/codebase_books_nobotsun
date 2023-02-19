import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material'

type BookInfo = {
  title: string
  state: string
  date?: string
  href: string
}

const Book_Infomation: BookInfo[] = [
  { title: 'プログラミング言語Ruby', state: '貸し出し中', date: '2023-02-19', href: '/books/1' },
  { title: 'プログラミング言語PHP', state: '予約中', date: '2023-02-19', href: '/books/2' },
  { title: 'プログラミング言語JavaScript', state: '借りている', date: '2023-02-19', href: '/books/3' },
  { title: 'プログラミング言語Python', state: '貸し出し可能', date: '2023-02-19', href: '/books/4' },
]

export const BookCard = () => {
  return (
    <>
      {Book_Infomation.map((info, index) => (
        <Card key={index}>
          <CardMedia sx={{ height: 240 }} image="/images/no-image.jpg" title="no image" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {info.title}
            </Typography>
          </CardContent>
          <CardActions>
            <div style={{ width: '100%' }}>
              <Box component="span" display="block" p={1} m={1}>
                {info.state}
              </Box>

              <Box component="span" display="block" p={1} m={1}>
                {info.date}
              </Box>

              <Button href={`/books/1`}>詳細</Button>
            </div>
          </CardActions>
        </Card>
      ))}
    </>
  )
}
