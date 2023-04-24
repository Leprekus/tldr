import Card from '@/app/components/Card';
import { IRedditPost, RedditPostsResponse } from '@/typings';
import React from 'react'

interface IEndpoints {
  'r': string;
  'p': string;
  'u': string;
}
type EndpointKeys = keyof IEndpoints;
export default async function Page({ params }: { params: { query: [EndpointKeys, string] }}) {
    const [filter, query] = params.query

  const endpoints: IEndpoints = {
      //subreddit query
        'r': 'https://www.reddit.com/subreddits/search.json?q=' + query,
      //user query
        'u': 'https://www.reddit.com/user/' + query + '/.json',
      //post / default query
        'p': 'https://www.reddit.com/search.json?q='+ query
    }
    console.log({ filter, query })
    const response = await fetch(endpoints[filter]);
    const json = await response.json()
    console.log({ json, url: endpoints[filter] })
    if(json?.error) return (
      <>
      <p>message: {json.message}</p>
      <p>Erro: {json.error}</p>
      </>
    )
    const posts = json.data.children.map((child:RedditPostsResponse) => child.data);
    return (
    <div>
        {posts.map((post: IRedditPost, i: number) => (
     
     <Card key={i} 
       data={posts}
       />
     
   ))} 
    </div>
  )
}
