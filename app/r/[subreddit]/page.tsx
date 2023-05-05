import About from '@/app/components/About';
import Card from '@/app/components/Card/Card';
import List from '@/app/components/Posts/List';
import RedditWrapper from '@/lib/RedditWrapper';
import posts from '@/lib/posts';
import { IRedditPost, RedditPostsResponse } from '@/typings';
import React from 'react'

export default async function Subreddit({ params }: { params: { subreddit: string } }) {
   // Set the Reddit API endpoint and subreddit name
   const [subreddit, about] = await posts({ page: 'subreddit', query: params.subreddit})
   


  return (
    <>
      <About data={about}/>
    <main className="flex min-h-screen justify-center gap-x-4 p-4">

        <List data={subreddit}/>
        {/* <div className='w-96 h-96 bg-red-500'/> */}
    </main>
    </>
  )
}
