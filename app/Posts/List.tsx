'use client';
import React, { useState } from 'react';
import PostFilters from '../components/PostFilters';
import { IRedditPost, RedditPostsResponse } from '@/typings';
import Card from '../components/Card';

export default function List({ data }: { data: RedditPostsResponse }) {
    const originalData = structuredClone(data)
    const [posts, setPosts] = useState(data);
  console.log({ post: data[0] })
  return (
    <div>
      <PostFilters 
      data={posts} 
      original={originalData} 
      setData={setPosts} />

      {posts.map((post: IRedditPost, i: number) => (
        <>
        <Card key={i} title={post.title} text={post.selftext!} />
        <p>ratip {post.upvote_ratio}</p>
        <p>upvotes {post.ups}</p>
        <p>downvotes {Math.floor(post.ups * post.upvote_ratio - post.ups)}</p>
        <p>created at: {post.created}</p>
        </>
      ))}
    </div>
  );
}
