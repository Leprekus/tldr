import Card from '@/app/components/Card/Card';
import List from '@/app/components/Posts/List';
import RedditWrapper from '@/lib/RedditWrapper';
import { IRedditPost, RedditPostsResponse } from '@/typings';
import { cookies } from 'next/dist/client/components/headers';
import React from 'react'

interface IEndpoints {
  'r': { subreddits: string };
  'u': { user: string };
  'p': { query: string };
}
type EndpointKeys = keyof IEndpoints;

export default async function Search({ params }: { params: { query: [EndpointKeys, string] }}) {
    const [filter, query] = params.query
    
  const redditWrapper = new RedditWrapper()
  const endpoints: IEndpoints = {

      //subreddit query
        'r': { subreddits: query },
      //user query
        'u':{ user: query },
  
      //post / default query
        'p': { query: query },
    }

    const posts = await redditWrapper.search(endpoints[filter])
  

    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        
        <List data={posts}/>

      </main>

  )
}
