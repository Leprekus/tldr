import { Inter } from 'next/font/google'
import AuthButtons from './AuthButtons'
const inter = Inter({ subsets: ['latin'] })
import { cookies } from 'next/headers'
import snoowrap, { Listing, Submission } from 'snoowrap'
import { cache } from 'react'
import Card from './components/Card'

export const preload = () => {
  posts()
}
export const posts = async () => {
  const req = await fetch('https://www.reddit.com/.json', { next: { revalidate: 120 } })
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
  const textPosts = data.data.children.filter((post) => post.data?.selftext)
  console.log({data: textPosts[0]})
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     {/* <AuthButtons/> */}
    {textPosts.map((post, i: number) => (
        <Card key={i} 
          title={post.data.title}
          text={post.data.selftext}
          />
        
      ))} 
   
    </main>
  )
}
