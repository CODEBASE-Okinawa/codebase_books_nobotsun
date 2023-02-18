import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/layouts/MainLayout'
import { Container, Grid, Breadcrumbs, Typography, TextField, Box, Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import styles from './style.module.css'

export default function New() {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | ArrayBuffer | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSelectImage = (e: React.MouseEvent) => {
    e.preventDefault()
    if (image && imagePreviewUrl) return
    ;(inputRef.current as HTMLInputElement).click()
  }

  const handleDeleteImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImage(null)
    setImagePreviewUrl(null)
  }

  const handleFileChange = (e: React.ChangeEvent) => {
    const reader = new FileReader()
    const target = e.target as HTMLInputElement
    if (!target) return
    const file = (target.files as FileList)[0]
    if (!file) return
    reader.onloadend = () => {
      setImage(file)
      setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <MainLayout>
      <Grid item xs={12}>
        <Breadcrumbs sx={{ marginBottom: 5 }}>
          <Link href="/books">本一覧</Link>
          <Typography color="text.primary">ここに本のタイトルが入ります</Typography>
        </Breadcrumbs>
      </Grid>
      <Container>
        <Grid container component="form">
          <Grid item xs={6}>
            <Typography>画像</Typography>
            <Box
              component="div"
              onClick={handleSelectImage}
              sx={{
                width: 'min(100%, 400px)',
                height: 'min(100%, 400px)',
                border: '1px solid #bbb',
                borderRadius: 2,
                aspectRatio: '1/1',
                cursor: 'pointer',
                position: 'relative',
                transition: '.5s',
                overflow: 'hidden',
                '&:hover': {
                  borderColor: '#888',
                },
              }}
            >
              {image ? (
                <Box
                  sx={{
                    width: 'min(100%, 400px)',
                    height: 'min(100%, 400px)',
                  }}
                >
                  {/* eslint-disable-next-line */} {/* @ts-ignore */}
                  <img className={styles.previewImg} src={imagePreviewUrl} />
                  <IconButton
                    onClick={handleDeleteImage}
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      color: '#999',
                      '&:hover': {
                        color: 'red',
                      },
                    }}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                </Box>
              ) : (
                <AddIcon
                  fontSize="large"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    margin: 'auto',
                    color: '#bbb',
                  }}
                />
              )}
            </Box>
            <input ref={inputRef} id="image" name="image" type="file" accept="image/*" onChange={handleFileChange} hidden />
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                marginBottom: 3,
              }}
            >
              <Typography>タイトル</Typography>
              <TextField id="title" type="text" required size="small" fullWidth variant="outlined" />
            </Box>
            <Button type="submit" variant="contained">
              登録
            </Button>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  )
}
