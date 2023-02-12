import { Inter } from '@next/font/google'
import { MainLayout } from '@/layouts/MainLayout'
import { Session } from '@/components/Session'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <MainLayout>Main</MainLayout>
}
