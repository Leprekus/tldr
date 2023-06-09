import { Inter } from 'next/font/google'
import { IAboutSubreddit, IRedditPost, RedditPostsResponse } from '@/typings'
import List from './components/Posts/List'

import { cookies } from 'next/dist/client/components/headers'
import RedditWrapper from '@/lib/RedditWrapper'
import posts from '@/lib/posts'
import Subreddit from './components/Subreddit/Subreddit'
import Inbox from './components/Inbox'


const inter = Inter({ subsets: ['latin'] })

export const revalidate = 300;


export default async function Home() {

  //posts can return [ unauthFrontpage ] or [frontpage, upvoted, downvoted]
  const frontpage = await posts({ page: 'homepage' })
  const trendingSubreddits = await posts({ page: 'trendingSubreddits' })
  //handle when user is not logged in, app fails to load if this request fails.
  //const notifications = await posts({ page: 'notifications' })
  
  if(!frontpage) {
    return <p>something went wrong</p>
  } 
  //flex min-h-screen flex-row items-start justify-between
  return (
    <main className="min-h-screen grid grid-flow-col auto-cols-min gap-4 justify-center">

    <div className='hidden md:block text-gray-700 mb-2 justify-self-center col-span-1'>
    <h1 className='text-xl font-semibold'>Popular Subreddits</h1>
    <List className='w-48 h-96 overflow-y-scroll scroll-smooth' 
    mini
    data={trendingSubreddits}/>
    </div>


    <List 
    className='justify-self-center col-span-2'
    data={frontpage}/>


    {/* <div className='hidden lg:block justify-self-center col-span-1'>
    <h1 className='text-xl font-semibold'>Your Recent Activity</h1>
    <Inbox 
    className='w-full h-96 overflow-y-scroll scroll-smooth'
    data={notifications}/>
    </div> */}

    </main>
  )

}
