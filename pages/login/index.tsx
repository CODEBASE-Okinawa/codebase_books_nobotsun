import { Button, Card, TextField, Typography } from '@mui/material'
import { SimpleLayout } from '@/layouts/SimpleLayout'
import styles from './style.module.css'

export default function Login() {
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

        {/* メールアドレスフィールド */}
        <label className={`${styles.label} ${styles.margin}`}>
          <Typography>メールアドレス</Typography>
          <TextField type="email" required size="small" fullWidth variant="outlined" />
        </label>

        {/* パスワードフィールド */}
        <label className={`${styles.label} ${styles.margin}`}>
          <Typography>パスワード</Typography>
          <TextField type="password" required size="small" fullWidth variant="outlined" />
        </label>

        {/* Submitボタン */}
        <div className={styles.margin}>
          <Button variant="contained" color="primary">
            ログイン
          </Button>
        </div>

        <div>
          <Button href="#link" color="primary">
            アカウント作成はこちら
          </Button>
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
