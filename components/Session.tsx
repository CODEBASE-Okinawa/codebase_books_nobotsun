import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@mui/material'
export function Session() {
  const { data: session } = useSession()
  if (session) {
    return (
      <Button color="error" variant="contained" onClick={() => signOut()}>
        ログアウト
      </Button>
    )
  }

  return (
    <>
      <Link href="/login">
        <Button color="inherit" variant="outlined">
          ログイン
        </Button>
      </Link>
    </>
  )
}
