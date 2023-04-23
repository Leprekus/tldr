import Card from '@/app/components/Card';
import React from 'react'

export default async function Page({ params }: { params: { subreddit: string } }) {
   // Set the Reddit API endpoint and subreddit name
const response = await fetch('https://www.reddit.com/r/' + params.subreddit + '/new.json');
const json = await response.json()
const posts = json.data.children.map(child => child.data);



  return (
    <div>
        {
            posts.map((post, i) => (
                <Card
                key={i}
                title={post.title}
                text={post?.text}
                />
            ))
        }
    </div>
  )
}
