import { IInitialState, IRedditPost } from '@/typings'
import React from 'react'
import Card from '../Card/Card'
import TextPost from '../Card/TextPost'
import LinkPost from '../Card/LinkPost'
import ImagePost from '../Card/ImagePost'
import { Carousel } from '../Card/GalleryPost'
import CardFooter from '../Card/CardFooter'
import Comment from './Comment'
import useStore from '@/app/hooks/store'
import VideoPost from '../Card/VideoPost'

export default function Post({ post }: { post: IRedditPost }) {
  const currentCommentId = useStore((state: IInitialState) => state.comments.currentCommentId);
 
  return (
    <div className='flex flex-col gap-2 ' style={{ maxWidth: 600}}>
        <Card post={post} header={post.title} link={post.subreddit_name_prefixed}>
          {post?.selftext && <TextPost text ={post.selftext!}/>}
          {/* link post */}
          {post?.url_overridden_by_dest && post?.post_hint === 'link' && <LinkPost post ={post}/>}
          {post.post_hint === 'image' && post.is_reddit_media_domain && <ImagePost post ={post}/>}
          {/* gallery */}
          {!post.selftext && post.media_metadata && <Carousel post ={post}/>}
          {post.is_video && <VideoPost post={post}/>}
          <CardFooter post={post}/>
        </Card>
        {post.id === currentCommentId && <Comment post={post}/>}
      
    </div>
  )
}
