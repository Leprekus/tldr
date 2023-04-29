import Card from '@/app/components/Card';
import List from '@/app/components/Posts/List';
import RedditWrapper from '@/lib/RedditWrapper';
import posts from '@/lib/posts';
import { IRedditPost, RedditPostsResponse } from '@/typings';
import React from 'react'

export default async function Subreddit({ params }: { params: { subreddit: string } }) {
   // Set the Reddit API endpoint and subreddit name

const subreddit = await posts({ page: 'subreddit', query: params.subreddit})



  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <List data={subreddit}/>
    
    </main>
  )
}
