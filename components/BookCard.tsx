import Link from 'next/link'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'

export const BookCard = () => {
  return (
    <Card>
      <CardMedia sx={{ height: 240 }} image="/images/no-image.jpg" title="no image" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          プログラミング言語Ruby
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="/books/1">
          <Button>詳細</Button>
        </Link>
      </CardActions>
    </Card>
  )
}
