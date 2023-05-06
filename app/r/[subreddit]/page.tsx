import About from '@/app/components/About';
import Card from '@/app/components/Card/Card';
import List from '@/app/components/Posts/List';
import RedditWrapper from '@/lib/RedditWrapper';
import posts from '@/lib/posts';
import { IRedditPost, RedditPostsResponse } from '@/typings';
import React from 'react'

export default async function Subreddit({ params }: { params: { subreddit: string } }) {
   // Set the Reddit API endpoint and subreddit name
   const subreddit = await posts({ page: 'subreddit', query: params.subreddit})
   const subredditAbout = await posts({ page: 'subredditAbout', query: params.subreddit})


  return (
    <>
    <main className=" min-h-screen flex flex-col items-center 
    md:flex-row md:items-start justify-center p-4">
        <About data={subredditAbout}/>
        <List data={subreddit}/>

    </main>
    </>
  )
}
