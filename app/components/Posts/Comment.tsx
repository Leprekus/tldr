import React, { useEffect, useState } from 'react'
import Button from '../Button'
import { IInitialState, IRedditPost } from '@/typings'
import useStore from '@/app/hooks/store'
import { useSession } from 'next-auth/react'
import RedditWrapper from '@/lib/RedditWrapper'

export default function Comment({post}: { post: IRedditPost}) {
    const removeCurrentCommentId = useStore((state:IInitialState) => state.removeCurrentCommentId)
    const [data, setData] = useState([])
    const { comments } = useStore()
    const { data: session } = useSession()
    const redditWrapper = new RedditWrapper()
    useEffect(() => {
      if(!session) {
        redditWrapper.getComments({ subreddit: post.subreddit, id: post.id})
        return 
      }
      const headers = {
        Authorization: `Bearer ${session?.accessToken}`,
      } 
      fetch('/api/user/vote', {
        method: 'POST',
        headers,
        body: JSON.stringify({ subreddit: post.subreddit, id: post.id }),
      });
      return 
    })
    return ( 
    <div className='w-80 h-72 bg-red-500'>Comment 
    <Button onClick={() => removeCurrentCommentId()}>x</Button>
    
    </div>

  )
}