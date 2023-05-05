import { Inter } from 'next/font/google'
import { IRedditPost, RedditPostsResponse } from '@/typings'
import List from '../components/Posts/List'

import { cookies } from 'next/dist/client/components/headers'
import RedditWrapper from '@/lib/RedditWrapper'


const inter = Inter({ subsets: ['latin'] })

export const revalidate = 300;



export default async function Upvoted() {

 

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
   
   
    </main>
  )
}
