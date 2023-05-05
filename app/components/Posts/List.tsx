'use client';
import React, { useEffect, useState } from 'react';
import PostFilters from '../PostFilters';
import { IRedditPost, RedditPostsResponse } from '@/typings';
import Card from '../Card/Card';
import { useSession } from 'next-auth/react';
import options from '@/lib/Options';
import TextPost from '../Card/TextPost';
import LinkPost from '../Card/LinkPost';
import ImagePost from '../Card/ImagePost';
import GalleryPost, { Carousel } from '../Card/GalleryPost';
import CardFooter from '../Card/CardFooter';

export default function List({ data }: { data: RedditPostsResponse }) {
    const { data: session } = useSession()

    const originalData = structuredClone(data)
    const [posts, setPosts] = useState(data);    

  return (
    <div>
      <PostFilters 
      data={posts} 
      original={originalData} 
      setData={setPosts} />

      {posts.map((post: IRedditPost, i: number) => (
        <>
        <Card key={'post_' + i } post={post} >
          {post.is_self && <TextPost post ={post}/>}
          {!post.selftext && !post.is_reddit_media_domain && <LinkPost post ={post}/>}
          {post.post_hint === 'image' && post.is_reddit_media_domain && <ImagePost post ={post}/>}
          {/* gallery */}
          {!post.selftext && post.media_metadata && <Carousel post ={post}/>}
          <CardFooter post={post}/>
        </Card>
        <p key={'ratio_' + i }>ratip {post.upvote_ratio}</p>
        <p key={'ups_' + i }>upvotes {post.ups}</p>
        <p key={'downs_' + i }>downvotes {Math.floor(post.ups * post.upvote_ratio - post.ups)}</p>
        <p key={'created_' + i }>created at: {post.created}</p>
        </>
      ))}
    </div>
  );
}
