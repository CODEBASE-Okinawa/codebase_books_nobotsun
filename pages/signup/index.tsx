import { Button, Card, TextField, Typography } from '@mui/material'
import { SimpleLayout } from '@/layouts/SimpleLayout'
import styles from './style.module.css'

export default function Signup() {
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
        {/* ロゴコンポーネント */}
        <Typography variant="h5" color="primary" className={`${styles.margin}`}>
          CODEBASE BOOKS
        </Typography>

        {/* タイトルコンポーネント */}
        <Typography sx={{ marginBottom: '40px' }} component="h1" variant="h5">
          新規アカウント登録
        </Typography>

        {/* 名前フィールド */}
        <label className={`${styles.label} ${styles.margin}`}>
          <Typography>名前</Typography>
          <TextField required size="small" fullWidth variant="outlined" />
        </label>

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
            新規作成
          </Button>
        </div>

        <div>
          <Button href="#link" color="primary">
            ログインはこちら
          </Button>
        </div>
      </Card>
    </SimpleLayout>
  )
}
