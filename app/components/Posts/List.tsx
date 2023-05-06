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
import Post from './Post';

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
        <Post post={post} key={post.id}/>

      ))}
    </div>
  );
}
