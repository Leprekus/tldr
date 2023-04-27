import Card from '@/app/components/Card';
import List from '@/app/components/Posts/List';
import RedditWrapper from '@/lib/RedditWrapper';
import posts from '@/lib/posts';
import { IRedditPost, RedditPostsResponse } from '@/typings';
import React from 'react'

export default async function Subreddit({ params }: { params: { subreddit: string } }) {
   // Set the Reddit API endpoint and subreddit name
//const response = await fetch('https://www.reddit.com/r/' + params.subreddit + '/.json');
console.log({ subreddit: params.subreddit})
const subreddit = await posts({ page: 'subreddit', query: params.subreddit})


  return (
    <div>
        <List data={subreddit}/>
    
    </div>
  )
}
