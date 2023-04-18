import { Inter } from 'next/font/google'
import AuthButtons from './AuthButtons'
const inter = Inter({ subsets: ['latin'] })
import { cookies } from 'next/headers'
import snoowrap, { Listing, Submission } from 'snoowrap'
import { cache } from 'react'

export const preload = () => {
  posts()
}
export const posts = async () => {
  const req = await fetch('https://www.reddit.com/.json')
  const data = await req.json()
  return data
}
export default async function Home() {
  // const token  = cookies().get('token')?.value
  // const posts = await fetch('http://localhost:3000/api/posts', {
  //   method: 'POST',
  //   cache: 'force-cache',
  //   body: token
    
  // })

//'https://www.reddit.com/search.json?q=query'
  const data = await posts()
  const textPosts = data.data.children.filter(post => post.data?.selftext)
  console.log({textPosts})
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <AuthButtons/>
    {textPosts.map((post, i) => (
        <div key={i} className='w-96 flex flex-col gap-y-2 my-6'>
          <h2 className='text-lg text-purple-300'>{post.data.title}</h2>
          <p>{post.data?.selftext}</p>
        </div>
      ))}
   
    </main>
  )
}
