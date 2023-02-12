import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@mui/material'
export function Session() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <Button color="error" variant="contained" onClick={() => signOut()}>
          ログアウト
        </Button>
      </>
    )
  }

  return (
    <>
      <Button color="inherit" variant="outlined" onClick={() => signIn()}>
        ログイン
      </Button>
    </>
  )
}
