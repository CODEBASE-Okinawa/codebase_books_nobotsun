import { Button, Card, TextField, Typography } from '@mui/material'
import { SimpleLayout } from '@/layouts/SimpleLayout'
import { useForm, SubmitHandler } from 'react-hook-form'
import Router from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import styles from './style.module.css'
import { useEffect } from 'react'
import Link from 'next/link'

type FormState = {
  name: string
  email: string
  password: string
}

export default function Signup() {
  // バリデーションのスキーマ
  const schema = z.object({
    name: z.string().min(1, { message: '1文字以上入力する必要があります' }),
    email: z.string().email({ message: 'メールアドレスの形式ではありません' }),
    password: z.string().min(8, { message: '8文字以上入力する必要があります' }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    console.log(errors)
  })

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    try {
      const body = { data }
      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/')
    } catch (err) {
      console.error('ユーザー登録に失敗しました ', err)
    }
  }

  return (
    <SimpleLayout>
      <Card
        sx={{
          width: '95%',
          maxWidth: 550,
          padding: '50px 70px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          display: 'block',
          transform: 'translate(-50%, -50%)',
        }}
        variant="outlined"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ロゴコンポーネント */}
          <Typography sx={{ marginBottom: '40px' }} variant="h5" color="primary">
            CODEBASE BOOKS
          </Typography>

          {/* タイトルコンポーネント */}
          <Typography sx={{ marginBottom: '40px' }} component="h1" variant="h5">
            新規アカウント登録
          </Typography>

          {/* 名前フィールド */}
          <label className={`${styles.label} ${styles.margin}`}>
            <Typography>名前</Typography>
            <TextField
              type="text"
              error={!!errors?.name}
              helperText={errors.name?.message}
              size="small"
              fullWidth
              variant="outlined"
              {...register('name', { required: true })}
            />
          </label>

          {/* メールアドレスフィールド */}
          <label className={`${styles.label} ${styles.margin}`}>
            <Typography>メールアドレス</Typography>
            <TextField
              type="email"
              error={!!errors?.email}
              helperText={errors.email?.message}
              size="small"
              fullWidth
              variant="outlined"
              {...register('email', { required: true })}
            />
          </label>

          {/* パスワードフィールド */}
          <label className={`${styles.label} ${styles.margin}`}>
            <Typography>パスワード</Typography>
            <TextField
              type="password"
              error={!!errors?.password}
              helperText={errors.password?.message}
              size="small"
              fullWidth
              variant="outlined"
              {...register('password', { required: true })}
            />
          </label>

          {/* Submitボタン */}
          <div className={styles.margin}>
            <Button variant="contained" color="primary" type="submit">
              新規作成
            </Button>
          </div>
        </form>

        <div>
          <Link href="login">
            <Button color="primary">ログインはこちら</Button>
          </Link>
        </div>
      </Card>
    </SimpleLayout>
  )
}
