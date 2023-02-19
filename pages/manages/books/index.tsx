import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MainLayout } from '@/layouts/MainLayout'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Button } from '@mui/material'
import styles from './style.module.css'

const columns = [
  { id: 'id', label: 'ID', width: 70 },
  { id: 'image', label: '画像', width: 200 },
  { id: 'title', label: 'タイトル', width: 500 },
  { id: 'status', label: 'ステータス', width: 130 },
  { id: 'startAt', label: '貸出開始日', width: 150 },
  { id: 'endAt', label: '貸出終了日', width: 150 },
]

// TODO: APIから取ってくる
const rows = [
  { id: 1, image: '', title: 'test', status: '貸出中', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 2, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 3, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 4, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 5, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 6, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 7, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 8, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 9, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 10, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 11, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 12, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 13, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 14, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
  { id: 15, image: '', title: 'test2', status: '貸出可能', startAt: '2023-02-01', endAt: '2023-02-14' },
]

export default function Books() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const perPage = sessionStorage.getItem('manageBooks')
    if (perPage) {
      setRowsPerPage(+perPage)
    }
  }, [rowsPerPage])

  useEffect(() => {
    const routerPage = router.query.page
    if (routerPage) {
      setPage(+routerPage)
    }
  }, [router.query.page])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    router.push({ query: { page: newPage } })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    sessionStorage.setItem('manageBooks', event.target.value)
    setPage(0)
  }

  return (
    <MainLayout>
      <Grid item xs={12}>
        <div className={styles.flex}>
          <Typography component="h2" variant="h5">
            本一覧
          </Typography>
          <Link href="books/new">
            <Button variant="contained">本を登録する</Button>
          </Link>
        </div>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell key={column.id} style={{ width: column.width }}>
                      {column.label}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {columns.map((column) => {
                      // @ts-ignore
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id}>
                          {column.id === 'image' ? (
                            <Image
                              style={{
                                width: '100%',
                                height: 'auto',
                              }}
                              src={value || '/images/no-image.jpg'}
                              sizes="100vw"
                              width={1080}
                              height={1150}
                              alt="no-image"
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </MainLayout>
  )
}
