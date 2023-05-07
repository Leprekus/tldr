'use client';
import React, { useEffect, useState } from 'react';
import PostFilters from '../PostFilters';
import { IInitialState, IRedditPost, RedditPostsResponse } from '@/typings';
import Card from '../Card/Card';
import { useSession } from 'next-auth/react';
import Post from './Post';
import useStore from '@/app/hooks/store';


export default function List({ data }: { data: RedditPostsResponse }) {
    const { data: session } = useSession()

    const originalData = structuredClone(data)
    const [posts, setPosts] = useState(data);    
    const setComments = useStore((state: IInitialState) => state.setComments);
  return (
    <div>
      <PostFilters 
      data={posts} 
      original={originalData} 
      setData={setPosts} />

      {posts.map((post: IRedditPost) => {
        setComments(post.id)
        return (
        <Post post={post} key={post.id}/>

      )})}
    </div>
  );
}
