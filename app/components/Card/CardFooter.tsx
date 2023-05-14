import React from 'react'
import Button from '../Button'
import { IRedditPost } from '@/typings'
import Link from 'next/link'

export default function CardFooter({ post,  }: { post: IRedditPost }) {
  const authorImage = fetch('https://www.reddit.com/user/' + post.author + '/about.json')
  .then(res => res.json())
  .then(data => data)
  return (
    <div  style={{ borderTopWidth: 1 }}
    className='h-24 border-t-1 border-zinc-200 flex items-center gap-x-4'
    >
        <div className='w-10 h-10 rounded-full bg-blue-50'/>
          <Button
            className='text-gray-600'
            href={'u/' + post.author}
            disabled={post.author === '[deleted]' ? true : false}
            variant='ghost'
            onClick={() => ''}
            >u/{post.author}</Button>
        
        </div>
  )
}
