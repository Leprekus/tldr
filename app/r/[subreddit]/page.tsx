import Card from '@/app/components/Card';
import List from '@/app/components/Posts/List';
import { IRedditPost, RedditPostsResponse } from '@/typings';
import React from 'react'

export default async function Subreddit({ params }: { params: { subreddit: string } }) {
   // Set the Reddit API endpoint and subreddit name
const response = await fetch('https://www.reddit.com/r/' + params.subreddit + '/.json');
const json = await response.json()
const posts = json.data.children.map((child:RedditPostsResponse) => child.data);



  return (
    <div>
        {params.subreddit}
        <List data={posts}/>
    </div>
  )
}
