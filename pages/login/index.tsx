import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getCsrfToken, signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Card, TextField, Typography } from '@mui/material'
import { SimpleLayout } from '@/layouts/SimpleLayout'
import styles from './style.module.css'

type FormState = {
  email: string
  password: string
}

export default function Login({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const schema = z.object({
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

  const router = useRouter()
  const [error, setError] = useState('')
  const onSubmit: SubmitHandler<FormState> = async (data) => {
    setError('')
    console.log(data)
    await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}`,
    }).then((res) => {
      if (res?.error) {
        setError('ユーザーが存在しないかパスワードが正しくありません')
      } else {
        // ログイン後に飛ぶページ
        router.push('/')
      }
    })
  }

  return (
    <SimpleLayout>
      {/* 全体を囲むCardコンポーネント */}
      <Card
        sx={{
          width: '95%',
          maxWidth: '550px',
          padding: '50px 70px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        variant="outlined"
      >
        {/* ロゴコンポーネント */}
        <Typography sx={{ marginBottom: '40px' }} variant="h5" color="primary">
          CODEBASE BOOKS
        </Typography>

        {/* タイトルコンポーネント */}
        <Typography sx={{ marginBottom: '40px' }} component="h1" variant="h5">
          ログイン
        </Typography>
        <span style={{ color: 'red' }}>{error}</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
            <Button type="submit" variant="contained" color="primary">
              ログイン
            </Button>
          </div>
        </form>
        <div>
          <Link href="/signup">
            <Button color="primary">アカウント作成はこちら</Button>
          </Link>
        </div>
        <div>
          <Button href="#link" color="primary">
            パスワードを忘れた場合はこちら
          </Button>
        </div>
      </Card>
    </SimpleLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
