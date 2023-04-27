import Card from '@/app/components/Card';
import List from '@/app/components/Posts/List';
import RedditWrapper from '@/lib/RedditWrapper';
import { IRedditPost, RedditPostsResponse } from '@/typings';
import { cookies } from 'next/dist/client/components/headers';
import React from 'react'

interface IEndpoints {
  'r': string;
  'p': string;
  'u': string;
}
type EndpointKeys = keyof IEndpoints;

export default async function Search({ params }: { params: { query: [EndpointKeys, string] }}) {
    const [filter, query] = params.query

  const endpoints: IEndpoints = {
      //subreddit query
        'r': 'https://www.reddit.com/subreddits/search.json?q=' + query,
      //user query
        'u': 'https://www.reddit.com/user/' + query + '/.json',
  
      //post / default query
        'p': 'https://www.reddit.com/search.json?q='+ query
    }

    //const response = await fetch(endpoints[filter]);
    const data = endpoints[filter]
    const session = JSON.parse(cookies().get('session')?.value!)
  
    // const response = await fetch('https://oauth.reddit.com/users/search?q=chrisdh79', {
    //   headers : {
    //     Authentication: 'Bearer ' + session.accessToken
    //   }
    // })
  
    const r = new RedditWrapper()
    const json = await r.searchUnauthenticated({ subreddits: 'my query'})
    //console.log({ json })
  

    

    //const posts = json.data.children.map((child:RedditPostsResponse) => child.data);

    
    
  

  //   return (
  //    <List data={posts}/>

  // )
}
