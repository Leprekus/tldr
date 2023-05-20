import { IRedditPost } from '@/typings'
import formatRedditUrl from '@/utils/formatRedditUrl'
import React from 'react'

export default function VideoPost({ post }: { post: IRedditPost }) {
    console.log({dash: formatRedditUrl(post.secure_media.reddit_video.dash_url)})
    console.log({fallback: formatRedditUrl(post.secure_media.reddit_video.fallback_url)})
  return (
    <div className='w-fit mx-auto'>
        <video controls height={250} className='max-h-[500px]'>
            <source 
            src={formatRedditUrl(post.secure_media.reddit_video.fallback_url)} 
            type="video/mp4"/>
            Your browser does not support the video tag.
        </video>
    </div>
  )
}
