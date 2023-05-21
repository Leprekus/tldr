import { Inter } from 'next/font/google'
import { IAboutSubreddit, IRedditPost, RedditPostsResponse } from '@/typings'
import List from './components/Posts/List'

import { cookies } from 'next/dist/client/components/headers'
import RedditWrapper from '@/lib/RedditWrapper'
import posts from '@/lib/posts'
import Subreddit from './components/Subreddit/Subreddit'


const inter = Inter({ subsets: ['latin'] })

export const revalidate = 300;


export default async function Home() {

  //posts can return [ unauthFrontpage ] or [frontpage, upvoted, downvoted]
  const frontpage = await posts({ page: 'homepage' })
  const trendingSubreddits = await posts({ page: 'trendingSubreddits' })
  if(!frontpage) {
    return <p>something went wrong</p>
  } 
  console.log({ trendingSubreddits})
  //flex min-h-screen flex-row items-start justify-between
  return (
    <main className="min-h-screen grid grid-flow-col auto-cols-min gap-4 justify-center">

    <div className='hidden md:block justify-self-center col-span-1'>
    <h1>Popular Subreddits</h1>
    <List className='w-48 h-96 overflow-y-scroll scroll-smooth shadow' 
    mini
    data={trendingSubreddits}/>
    </div>


    <List 
    className='justify-self-center col-span-2'
    data={frontpage}/>


    <div className='hidden lg:block justify-self-center col-span-1'>
    <h1>Popular Subreddits</h1>
    <List className='w-48 h-96 overflow-y-scroll scroll-smooth shadow ' 
    mini
    data={trendingSubreddits}/>
    </div>

    </main>
  )

}
