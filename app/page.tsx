import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Card from './components/Card'
import { IRedditPost, RedditPostsResponse } from '@/typings'

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

  const data: RedditPostsResponse = await posts()

  const textPosts = data.data.children.filter((post: RedditPostsResponse) => post.data?.selftext).map((post:RedditPostsResponse) => post.data)
  console.log({data: textPosts[0]})
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    {textPosts.map((post: IRedditPost, i: number) => (
     
        <Card key={i} 
          title={post.title}
          text={post.selftext!}
          />
        
      ))} 
   
    </main>
  )
}
