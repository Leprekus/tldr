import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import Button from './AuthButtons'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const session = await getServerSession()
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Button/>
    </main>
  )
}
