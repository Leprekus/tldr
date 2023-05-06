import { IRedditPost } from '@/typings'
import React from 'react'
import Card from '../Card/Card'
import TextPost from '../Card/TextPost'
import LinkPost from '../Card/LinkPost'
import ImagePost from '../Card/ImagePost'
import { Carousel } from '../Card/GalleryPost'
import CardFooter from '../Card/CardFooter'

export default function Post({ post }: { post: IRedditPost }) {
  return (
    <div className='flex flex-col items-center gap-x-2 my-4 mx-2
     md:flex-row md:items-start'>
        <Card post={post} >
          {post.is_self && <TextPost post ={post}/>}
          {!post.selftext && !post.is_reddit_media_domain && <LinkPost post ={post}/>}
          {post.post_hint === 'image' && post.is_reddit_media_domain && <ImagePost post ={post}/>}
          {/* gallery */}
          {!post.selftext && post.media_metadata && <Carousel post ={post}/>}
          <CardFooter post={post}/>
          <p >ratip {post.upvote_ratio}</p>
          <p >upvotes {post.ups}</p>
          <p >downvotes {Math.floor(post.ups * post.upvote_ratio - post.ups)}</p>
          <p >created at: {post.created}</p>
        </Card>

        <div className='w-80 h-72 bg-red-500'></div>
    </div>
  )
}
