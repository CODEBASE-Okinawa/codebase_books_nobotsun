import { Button, Card, TextField, Typography } from '@mui/material'
import { SimpleLayout } from '@/layouts/SimpleLayout'
import { useForm, SubmitHandler } from 'react-hook-form'
import Router from 'next/router'
import styles from './style.module.css'

type IFormInput = {
  name: String
  email: String
  password: String
}

export default function Signup() {
  const { register, handleSubmit } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data)

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
            <TextField type="text" required size="small" fullWidth variant="outlined" {...register('name')} />
          </label>

          {/* メールアドレスフィールド */}
          <label className={`${styles.label} ${styles.margin}`}>
            <Typography>メールアドレス</Typography>
            <TextField type="email" required size="small" fullWidth variant="outlined" {...register('email')} />
          </label>

          {/* パスワードフィールド */}
          <label className={`${styles.label} ${styles.margin}`}>
            <Typography>パスワード</Typography>
            <TextField type="password" required size="small" fullWidth variant="outlined" {...register('password')} />
          </label>

          {/* Submitボタン */}
          <div className={styles.margin}>
            <Button variant="contained" color="primary" type="submit">
              新規作成
            </Button>
          </div>
        </form>

        <div>
          <Button href="#link" color="primary">
            ログインはこちら
          </Button>
        </div>
      </Card>
    </SimpleLayout>
  )
}
