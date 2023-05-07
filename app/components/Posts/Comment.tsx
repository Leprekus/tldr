import React, { Suspense, cache, useEffect, useState } from 'react'
import Button from '../Button'
import { IInitialState, IRedditComment, IRedditPost } from '@/typings'
import useStore from '@/app/hooks/store'
import { useSession } from 'next-auth/react'
import RedditWrapper from '@/lib/RedditWrapper'
import SkeletonComments from '../Skeletons/skeleton-comments'
import Paper from '../Card/Paper'
import Card from '../Card/Card'
import TextPost from '../Card/TextPost'


export default function Comment({post}: { post: IRedditPost}) {
    const removeCurrentCommentId = useStore((state:IInitialState) => state.removeCurrentCommentId)
    const { comments } = useStore()
    const { data: session } = useSession()
    const redditWrapper = new RedditWrapper()

    const [data, setData] = useState<[] | IRedditComment[]>([])
    useEffect(() => {
      if(!session) {
        redditWrapper.getComments({ subreddit: post.subreddit, id: post.id})
        .then(comments => {
          cache(comments)
          setData(comments)
        })
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
    }, [])
    console.log(data[0])
    return ( 
    <div 
    className='h-full text-xs md:absolute md:-right-72 overflow-y-scroll bg-red-500'> 
  
    <Button 
    className='sticky'
    onClick={() => removeCurrentCommentId()}>x</Button>

     {data.length ? 
      data.map((comment) => (
        <Card key={comment.id} post={comment} link={'u/' + comment.author}>
          <TextPost text={comment.body}/>
        </Card>
      )) :
      <p>Loading ....</p>
    }
    {/* <SkeletonComments/> */}
    
    </div>

  )
}
//find
//likes, name, title, subreddit_name_prefixed