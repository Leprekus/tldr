import Card from '@/app/components/Card';
import { IRedditPost, RedditPostsResponse } from '@/typings';
import React from 'react'

export default async function Page({ params }: { params: { query: string }}) {
    const endpoints = {
        subreddits: 'https://www.reddit.com/subreddits/search.json?q={subreddit}',
        query: ''
    }
    const response = await fetch('https://www.reddit.com/search.json?q='+ params.query);
    const json = await response.json()
    const posts = json.data.children.map((child:RedditPostsResponse) => child.data);
    
    return (
    <div>
        {posts.map((post: IRedditPost, i: number) => (
     
     <Card key={i} 
       title={post.title}
       text={post.selftext!}
       />
     
   ))} 
    </div>
  )
}
