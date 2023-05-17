import React, { Component, ReactNode, Suspense, cache, useEffect, useState } from 'react'
import Button from '../Button'
import { IInitialState, IRedditComment, IRedditPost } from '@/typings'
import useStore from '@/app/hooks/store'
import { useSession } from 'next-auth/react'
import RedditWrapper from '@/lib/RedditWrapper'
import SkeletonComments from '../Skeletons/skeleton-comments'
import Paper from '../Card/Paper'
import Card from '../Card/Card'
import TextPost from '../Card/TextPost'
import Link from 'next/link'
import ActionBar from '../Card/ActionBar'
import unauthComments from '@/utils/unauthComments'
import authenticateClient from '@/utils/authenticateClient'


export default function Comment({post}: { post: IRedditPost}) {
    const removeCurrentCommentId = useStore((state:IInitialState) => state.removeCurrentCommentId)
    const { comments } = useStore()
    const { data: session } = useSession()
    const redditWrapper = new RedditWrapper()

    const [data, setData] = useState<[] | IRedditComment[]>([])
    const fetchComments = async () => {

      const res = await fetch('/api/post/comments', {
        method: 'POST',
        body: JSON.stringify({
          subreddit: post.subreddit,
          id: post.id
        })
      })

      const { comments } = await res.json()
      console.log(comments)

      return setData(comments)
    }
    useEffect(() => {
      if(!session) {
        fetchComments()
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

   
    return ( 
    <div 
    className='h-full text-xs md:absolute md:-right-72 overflow-y-scroll bg-red-500'> 
  
    <Button 
    className='sticky'
    onClick={() => removeCurrentCommentId()}>x</Button>

     {data.length ? 
      data.map((comment) => (
        comment.body &&
        <CommentWrapper 
        key={comment.id}
        comment={comment}/>
      )) :
      <p>Loading ....</p>
    }
    {/* <SkeletonComments/> */}
    
    </div>

  )
}
//find
//likes, name, title, subreddit_name_prefixed
function CommentWrapper ({ comment, margin=0, n=1 }: { comment: IRedditComment, margin?: number, n?: number }) {
  const { data: session } = useSession()

  const next = comment?.replies?.data?.children[0]?.data?.body

  //if not end of thread replies array is 1th index
  //if end of thread replies array is 0th index
  const children = next ? comment?.replies?.data?.children[1]?.data?.children :
  comment?.replies?.data?.children[0]?.data?.children

  const [traversedChildren, setTraversedChildren] = useState<IRedditComment[]>([])

  const handleFetchReplies = async () => {
    //grab ids
    //fetch ids in groups of 10
    //slice array
    //pass array to component
    //repeat

    //note slice returns the sliced array so i need to work with the original
    //and just slice at the desired indexes
    const sliceStart = (10 * n) - 10;
    const sliceEnd = (10 * n)
  
    const slicedArray = children.slice(sliceStart, sliceEnd)

    console.log(comment?.replies?.data?.children[1]?.data?.children?.length)
    if(session) {

      return
    }
    fetch('/api/post/comments/replies', {
      method: 'POST',
      body: JSON.stringify({
        link_id: comment.link_id,
        ids: slicedArray
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data.replies.jquery[10][3])
      
    })

      //setTraversedChildren(prevState => [...prevState, ...replies])
    
    // console.log(comment.permalink)
    // fetch( 'https://www.reddit.com/' + comment.permalink + '.json?limit=10')
    // .then(res => res.json())
    // .then(data => {
    //   console.log({ thread: data })
    //   setReplies(data[1].data.children)})
    
  }
  

  return (
    <>
    <Paper 
        sx={{ maxWidth: 320, marginLeft: margin }}
        className='p-2'
        key={comment.id}>
          <div className='flex '>
          <ActionBar post={comment} padding={'pr-1'}/>
          <div>
            <Button variant='ghost'href={'u/' + comment.author}
            disabled={
            comment.author ?
            comment.author.includes('[deleted]') && true : false
            }>u/{comment.author}</Button>
            <p>{comment.body}</p>
          {children?.length > 0 &&
          <Button onClick={handleFetchReplies}>
            {children.length > 0 ? 'Show More' : 'Hide'}
          </Button>
          }
           {/* renders replies to comment */}
        <p>{traversedChildren?.length + '/' +  children?.length}</p>
          </div>
          </div>
        </Paper>
      
        {/* renders thread */}
        {next  &&
        <CommentWrapper comment={comment?.replies?.data?.children[0]?.data} margin={margin + 10}/>
        }
        
        </>
        
  )
}