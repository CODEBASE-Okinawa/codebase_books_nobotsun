import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@mui/material'

export type Books = {
  books: BookInfo[]
}

export type BookInfo = {
  title?: string
  state?: string
  date?: string
  href?: string
}

export const BookCard = (props: Books) => {
  const { books } = props
  return (
    <>
      <Grid container spacing={2}>
        {books.map((book, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardMedia sx={{ height: 240 }} image="/images/no-image.jpg" title="no image" />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {book.title}
                </Typography>
              </CardContent>
              <CardActions>
                <div style={{ width: '100%' }}>
                  <Box component="span" display="block" p={1} m={1}>
                    {book.state}
                  </Box>

                  {book.state === '予約中' ? (
                    <Box component="span" display="block" p={1} m={1}>
                      {book.date}に予約済み
                    </Box>
                  ) : null}

                  <Button href={`/books/1`}>詳細</Button>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
