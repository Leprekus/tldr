import { Inter } from 'next/font/google'
import AuthButtons from './AuthButtons'
const inter = Inter({ subsets: ['latin'] })
import { cookies } from 'next/headers'
import snoowrap, { Listing, Submission } from 'snoowrap'
import { cache } from 'react'
import Card from './components/Card'

const preload = () => {
  posts()
}
const posts = async () => {
  const response = await fetch('https://www.reddit.com/.json', { next: { revalidate: 120 } })
  const json = await response.json()
  return json
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
  const textPosts = data.data.children.filter((post) => post.data?.selftext).map(post => post.data)
  console.log({data: textPosts[0]})
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    {textPosts.map((post, i: number) => (
        <Card key={i} 
          title={post.title}
          text={post.selftext}
          />
        
      ))} 
   
    </main>
  )
}
