'use client'
import { IRedditPost } from '@/typings'
import formatRedditUrl from '@/utils/formatRedditUrl'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import dynamic from 'next/dynamic'

export default function VideoPost({ post }: { post: IRedditPost }) {
  const [hasWindow, setHasWindow] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
 
   return (
    <div className='w-fit mx-auto'>
    
       
        {hasWindow && <ReactPlayer controls width={380} height={400}
          url={formatRedditUrl(post.secure_media.reddit_video.hls_url)}/>}
        
    </div>
  )
}
