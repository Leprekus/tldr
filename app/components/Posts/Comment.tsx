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
import { CloseIcon } from '../Icons'


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
    className='w-full text-xs overflow-y-scroll'> 
  
    <Button 
    variant='ghost'
    className='sticky mb-2'
    onClick={() => removeCurrentCommentId()}><CloseIcon fill='#A9A9A9'/></Button>

     {data.length ? 
      data.map((comment) => (
        comment.body &&
        <CommentWrapper 
        key={comment.id}
        comment={comment}/>
      )) :
      <SkeletonComments/>
    }
    {/* <SkeletonComments/> */}
    
    </div>

  )
}
//find
//likes, name, title, subreddit_name_prefixed
function CommentWrapper ({ comment, margin=0 }: { comment: IRedditComment, margin?: number }) {
  const { data: session } = useSession()

  const next = comment?.replies?.data?.children[0]?.data?.body
  
  //if not end of thread replies array is 1th index
  //if end of thread replies array is 0th index
  const children = next ? comment?.replies?.data?.children[1]?.data?.children :
  comment?.replies?.data?.children[0]?.data?.children

  const [traversedChildren, setTraversedChildren] = useState<IRedditComment[]>([])
  const [n, setN] = useState(1)

  useEffect(() => {
    traversedChildren.length > 0 && console.log({traversedChildren})
  }, [traversedChildren])

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

     setN(prevN => prevN + 1)
    console.log({ n, slicedArray})
    //console.log(comment?.replies?.data?.children[1]?.data?.children?.length)
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
      console.log({replies: data.replies.jquery[10][3][0]})
      const replies = data.replies.jquery[10][3][0]
      .map(({ data }: { data: IRedditComment}) => data)
      setTraversedChildren(prevState => [...prevState, ...replies])

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
        sx={{ marginLeft: margin }}
        className='p-2 w-full'
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
           {/* renders replies to comment */}
            {traversedChildren?.length > 0 && 
            traversedChildren.map(reply => <CommentWrapper key={reply.id} comment={reply} margin={0}/>)}
            
            {children?.length > 0 &&
            <Button variant='tertiary' onClick={handleFetchReplies}>
              {children.length > 0 ? 'Show More' : 'Hide'}
            </Button>
            }
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