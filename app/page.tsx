import { Inter } from 'next/font/google'
import { IRedditPost, RedditPostsResponse } from '@/typings'
import List from './components/Posts/List'

import { cookies } from 'next/dist/client/components/headers'
import RedditWrapper from '@/lib/RedditWrapper'
import posts from '@/lib/posts'


const inter = Inter({ subsets: ['latin'] })

export const revalidate = 300;


export default async function Home() {

  //posts can return [ unauthFrontpage ] or [frontpage, upvoted, downvoted]
  const frontpage = await posts({ page: 'homepage' })
  const trendingSubreddits = await posts({ page: 'trendingSubreddits' })
  if(!frontpage) {
    return <p>something went wrong</p>
  }

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    asfsdf
    <List data={frontpage}/>
   
    </main>
  )

}
