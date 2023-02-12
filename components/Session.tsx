import { useSession, signIn, signOut } from 'next-auth/react'

export function Session() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        ログイン中です {session.user?.email} <br />
        <button onClick={() => signOut()}>ログアウト</button>
      </>
    )
  }

  return (
    <>
      ログインしていません <br />
      <button onClick={() => signIn()}>ログイン</button>
    </>
  )
}
