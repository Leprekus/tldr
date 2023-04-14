import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import AuthButtons from './AuthButtons'
import authOptions from '../pages/api/auth/[...nextauth]'
const inter = Inter({ subsets: ['latin'] })


export default async function Home() {
  const session = await getServerSession(authOptions)
  
  console.log({ session })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <AuthButtons/>
    </main>
  )
}
