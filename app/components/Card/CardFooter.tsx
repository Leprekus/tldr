import React from 'react'
import Button from '../Button'
import { IRedditPost } from '@/typings'
import Link from 'next/link'
import { UpvoteIcon } from '../Icons'
import Tooltip from '../Tooltip'

export default function CardFooter({ post,  }: { post: IRedditPost }) {
  const authorImage = fetch('https://www.reddit.com/user/' + post.author + '/about.json')
  .then(res => res.json())
  .then(data => data)
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
            <div className='flex justify-between w-full gap-4'>
              <Tooltip title='Upvote Ratio'>
                <UpvoteIcon fill='#A9A9A9'/>
                <p >{post.upvote_ratio}</p>
              </Tooltip>

              <Tooltip title='Upvotes'>
                <UpvoteIcon fill='#A9A9A9'/>
                <p >{post.ups}</p>
              </Tooltip>
              
              <Tooltip title='Downvotes' className='flex gap-4'>
                <UpvoteIcon fill='#A9A9A9'/>
                <p >{Math.floor(post.ups * post.upvote_ratio - post.ups)}</p>
              </Tooltip>

              <Tooltip title={`Awards (${post.all_awardings.length})`} className='flex gap-4'>
                <UpvoteIcon fill='#A9A9A9'/>
                <p >{post.all_awardings.length}</p>
              </Tooltip>

            </div>
        </div>
  )
}
