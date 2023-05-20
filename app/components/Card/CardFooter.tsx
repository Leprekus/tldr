import React from 'react'
import Button from '../Button'
import { IRedditPost } from '@/typings'
import Link from 'next/link'
import { RatioIcon, TrophyIcon, UpvoteIcon } from '../Icons'
import Tooltip from '../Tooltip'

export default function CardFooter({ post,  }: { post: IRedditPost }) {
  return (
    <div  style={{ borderTopWidth: 1 }}
    className='h-fit py-4 border-t-1 border-zinc-200 flex flex-col  items-start gap-8'
    >
          <Button
            className='text-gray-600'
            href={'u/' + post.author}
            disabled={post.author === '[deleted]' ? true : false}
            variant='ghost'
            onClick={() => ''}
            >u/{post.author}</Button>
            <div className='flex items-center w-full gap-4'>
              <Tooltip title='Upvote Ratio'>
              <div style={{ fontSize: 8 }} className='w-4 h-4 rounded-full bg-gray-100 absolute left-4 -top-2 text-blue-500 flex justify-center items-center p-2 shadow'>{post.upvote_ratio * 100}</div>
                <RatioIcon fill='#A9A9A9'/>
              </Tooltip>

              {/* <Tooltip title='Upvotes'>
                <UpvoteIcon fill='#A9A9A9'/>
                <p >{post.ups}</p>
              </Tooltip>
              
              <Tooltip title='Downvotes' className='flex gap-4'>
                <UpvoteIcon fill='#A9A9A9'/>
                <p >{Math.floor(post.ups * post.upvote_ratio - post.ups)}</p>
              </Tooltip> */}

              <Tooltip title={`Awards (${post.all_awardings.length})`} className='flex gap-4'>
                <Button variant='ghost' disabled={true }>
                  {post.all_awardings.length > 0 && <div style={{ fontSize: 10 }} className='w-4 h-4 rounded-full bg-gray-100 absolute left-6 -top-1 text-blue-500 flex justify-center items-center p-2 shadow'>{post.all_awardings.length}</div>}
                  <TrophyIcon fill='#A9A9A9'/>
                </Button>
              </Tooltip>

            </div>
        </div>
  )
}
