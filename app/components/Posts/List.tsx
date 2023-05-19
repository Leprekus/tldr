"use client";
import React, { useEffect, useState } from "react";
import PostFilters from "../PostFilters";
import { IInitialState, IRedditPost, RedditPostsResponse } from "@/typings";
import Card from "../Card/Card";
import { useSession } from "next-auth/react";
import Post from "./Post";
import useStore from "@/app/hooks/store";
import Alert from "../Alert";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../Error";
export default function List({ data }: { data: RedditPostsResponse }) {
  const { data: session } = useSession();

  const originalData = structuredClone(data);
  const [posts, setPosts] = useState(data);
  const { alert } = useStore();


  return data?.error ? <Error error={data}/> : (
    <div >
      <PostFilters data={posts} original={originalData} setData={setPosts} />
      <div className="flex flex-col gap-12 mt-4">
        {posts.map((post: IRedditPost) => (
          <Post post={post} key={post.id} />
        ))}
        {alert.display && (
          <Alert
            setDisplay={alert.setDisplay}
            severity={alert.severity}
            message={alert.message}
          />
        )}
      </div>
    </div>
  );
}
