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
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'


export default function Comment({post}: { post: IRedditPost}) {
    const removeCurrentCommentId = useStore((state:IInitialState) => state.removeCurrentCommentId)

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
      return setData(comments)
    }
    useEffect(() => {
      fetchComments() 
    }, [])

   
    return ( 
    <Paper flex='col' className=' text-xs overflow-y-scroll p-2'> 
  
    <div>
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
    </Paper>

  )
}
//find
//likes, name, title, subreddit_name_prefixed
function CommentWrapper ({ comment, margin=0 }: { comment: IRedditComment, margin?: number }) {
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
    const sliceStart = (10 * n) - 10;
    const sliceEnd = (10 * n) > children.length ? children.length : (10 * n);
    
    const slicedArray = children.slice(sliceStart, sliceEnd)

     setN(prevN => (10 * n) > children.length ? prevN : prevN + 1)
    console.log({ n, slicedArray})
    //console.log(comment?.replies?.data?.children[1]?.data?.children?.length)  
    fetch('/api/post/comments/replies', {
      method: 'POST',
      body: JSON.stringify({
        link_id: comment.link_id,
        ids: slicedArray
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log({replies: data.replies.jquery[10][3][0]})
      const replies = data.replies.jquery[10][3][0]
      .map(({ data }: { data: IRedditComment}) => data)
      const children = [...traversedChildren, ...replies]
      const newChildren = [...new Set(children)]
      setTraversedChildren(newChildren)

    })
  }

  const handleHideReplies = () => {

    const sliceEnd = (10 * n) - 10 > children.length ? (10 * n) - 10 : children.length
    
    const slicedArray = children.slice(0, children.length - sliceEnd)

    setTraversedChildren(slicedArray)
    console.log({ slicedArray, sliceEnd })

    setN(prevN => (10 * n) - 10 > children.length ? prevN - 1 : prevN)

  }
  
  const areChildrenTraversed = children?.length > 0 && traversedChildren?.length < children?.length
  return (
    <>
    <Paper 
        sx={{ marginLeft: margin }}
        className='p-2'
        key={comment.id}>
          <div className='flex tracking-wider text-justify'>
          <ActionBar flex='col' post={comment} padding={'pr-1'}/>
          <div className='flex flex-col gap-1'>
            <Button variant='tertiary'href={'u/' + comment.author}
            disabled={
            comment.author ?
            comment.author.includes('[deleted]') && true : false
            }>u/{comment.author}</Button>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{comment.body}</ReactMarkdown>
           {/* renders replies to comment */}
            {traversedChildren?.length > 0 && 
            traversedChildren.map(reply => <CommentWrapper key={reply.id} comment={reply} margin={0}/>)}
            
            {children?.length > 0 &&
            <Button variant='tertiary' onClick={areChildrenTraversed ? handleFetchReplies : handleHideReplies}>
              {areChildrenTraversed ? `Show More ${traversedChildren?.length} | ${children?.length}` : `Hide ${children?.length > 10 ? 10 : children?.length} replies`}
            </Button>
            }
          </div>
          </div>
          
        </Paper>
      
        {/* renders thread */}
        {next  &&
        <CommentWrapper comment={comment?.replies?.data?.children[0]?.data} margin={margin + 1}/>
        }
        
        </>
        
  )
}