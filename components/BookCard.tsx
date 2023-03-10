import Link from 'next/link'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@mui/material'

export type Books = {
  books: BookInfo[]
}

export type BookInfo = {
  title?: string
  status: string
  imageUrl?: string
  date?: string
  href?: string
}

const statusBackgroundColor = (status: string) => {
  switch (status) {
    case '予約中':
      return '#f4a460'
    case '貸出中':
      return '#dc143c'
    case '借りている':
      return '#d3d3d3'
    case '貸出可能':
      return '#adff2f'
    default:
      return 'primary.dark'
  }
}

export const BookCard = (props: Books) => {
  const { books } = props
  return (
    <>
      <Grid container spacing={2} p={5}>
        {books.map((book, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <CardMedia sx={{ height: 240 }} image={book.imageUrl} title="no image" />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {book.title}
                </Typography>
              </CardContent>
              <CardActions>
                <div style={{ width: '100%' }}>
                  <Box
                    sx={{
                      width: 120,
                      height: 40,
                      backgroundColor: statusBackgroundColor(book.status),
                    }}
                    borderRadius={16}
                    textAlign="center"
                    component="span"
                    display="block"
                    fontWeight="fontWeightBold"
                    p={1}
                    m={1}
                  >
                    {book.status}
                  </Box>

                  {book.status === '予約中' ? (
                    <Box component="span" display="block" p={1} height={30}>
                      {book.date}から
                    </Box>
                  ) : (
                    <Box component="span" display="block" p={1} height={30}>
                      {''}
                    </Box>
                  )}

                  <Link href={book.href !== undefined ? book.href : ''}>
                    <Button>詳細</Button>
                  </Link>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
