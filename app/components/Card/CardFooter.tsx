import React from 'react'
import Button from '../Button'
import { IRedditPost } from '@/typings'
import Link from 'next/link'
import { RatioIcon, TrophyIcon, UpvoteIcon } from '../ui/Icons'
import { Tooltip } from 'react-tooltip'
export default function CardFooter({ post,  }: { post: IRedditPost }) {

  const displayAwards = () => {
    
  }
  return (
    <div  style={{ borderTopWidth: 1 }}
    className='h-fit py-4 border-t-1 border-zinc-200 flex items-start gap-8'
    >
          <Button
            className='text-gray-600'
            href={'u/' + post.author}
            disabled={post.author === '[deleted]' ? true : false}
            variant='ghost'
            onClick={() => ''}
            >u/{post.author}</Button>
            <div className='flex items-center w-full gap-4'>
              <span id={post.id + 'ratio-tooltip'} className='relative'>
              <div style={{ fontSize: 8 }} className='w-4 h-4 rounded-full bg-gray-100 absolute left-4 -top-2 text-blue-500 flex justify-center items-center p-2 shadow'>{post.upvote_ratio * 100}</div>
                  <RatioIcon fill='#A9A9A9'/>
                  <Tooltip anchorId={post.id + 'ratio-tooltip'} content='Upvote Ratio' place='top' className='transition-all rounded-md'/>
              </span>
            

              {/* <Tooltip title='Upvotes'>
                <UpvoteIcon fill='#A9A9A9'/>
                <p >{post.ups}</p>
              </Tooltip>
              
              <Tooltip title='Downvotes' className='flex gap-4'>
                <UpvoteIcon fill='#A9A9A9'/>
                <p >{Math.floor(post.ups * post.upvote_ratio - post.ups)}</p>
              </Tooltip> */}

              <span className='relative' id={post.id + 'trophies-tooltip'}>
              <Button 
              onClick={displayAwards}
              variant='ghost' disabled={ post.all_awardings.length < 1 && true }>
                  {post.all_awardings.length > 0 && <div style={{ fontSize: 10 }} className='w-4 h-4 rounded-full bg-gray-100 absolute left-6 -top-1 text-blue-500 flex justify-center items-center p-2 shadow'>{post.all_awardings.length}</div>}
                  <TrophyIcon fill='#A9A9A9'/>
              </Button>
              <Tooltip content={`Awards (${post.all_awardings.length})`} id={post.id + 'trophies-tooltip'}/>
                </span>
              

            </div>
        </div>
  )
}
