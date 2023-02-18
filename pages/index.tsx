import dynamic from 'next/dynamic'
import { Inter } from '@next/font/google'
import { MainLayout } from '@/layouts/MainLayout'
import { Session } from '@/components/Session'
import { trpc } from '../utils/trpc'

// const MainLayoutNoSSR = dynamic(() => import('@/layouts/MainLayout'), {
//   ssr: false,
// })

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'tRPC' })
  if (!hello.data) {
    return <div>Loading...</div>
  }
  return <MainLayout>{hello.data.greeting}</MainLayout>
}
