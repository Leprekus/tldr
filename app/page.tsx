import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import AuthButtons from './AuthButtons'
import authenticateClient from '@/utils/authenticateClient'

const inter = Inter({ subsets: ['latin'] })

export const preload = () => {
  authenticateClient()
}
export default async function Home() {
  const clientToken = await authenticateClient()
  console.log({clientToken})
  const session = await getServerSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <AuthButtons/>
    </main>
  )
}
