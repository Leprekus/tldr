'use client'
import React, { ReactNode } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'

export default function Inbox({ data, className }: { data: any, className?:string }) {
    console.log({ data })
  return (
    <div className={'flex flex-col ' + className}>{
        data.map((message: any) => (
            <div key={message.id} className='bg-red-50'>
                <p>From: {message.author}</p>
                {message?.subreddit && <p>r/{message.subreddit}</p>}
                <ReactMarkdown className='line-clamp-1' remarkPlugins={[remarkGfm]}>{message.body}</ReactMarkdown>
                {message.new && <p>unread</p>}
            </div>
        ))
    }</div>
  )
}
