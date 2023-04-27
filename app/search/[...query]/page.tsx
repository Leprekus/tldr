import Card from '@/app/components/Card';
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
        //'r': 'https://www.reddit.com/subreddits/search.json?q=' + query,
        'r': { subreddits: query },
      //user query
        //'u': 'https://www.reddit.com/user/' + query + '/.json',
        'u':{ user: query },
  
      //post / default query
        //'p': 'https://www.reddit.com/search.json?q='+ query
        'p': { query: query },
    }

    const posts = await redditWrapper.search(endpoints[filter])
    

    //const posts = json.data.children.map((child:RedditPostsResponse) => child.data);

    
    
  

    return (
     <List data={posts}/>

  )
}
