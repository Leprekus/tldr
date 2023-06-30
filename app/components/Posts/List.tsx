"use client";
import React, { useEffect, useState } from "react";
import PostFilters from "../PostFilters";
import { IAboutSubreddit, IInitialState, IRedditPost, RedditPostsResponse } from "@/typings";
import Card from "../Card/Card";
import { useSession } from "next-auth/react";
import Post from "./Post";
import useStore from "@/app/hooks/store";
import Alert from "../ui/Alert";
import { ErrorBoundary } from "react-error-boundary";

import Subreddit from "../Subreddit/Subreddit";
import Error from "../ui/Error";
export default function List({ data, className, mini=false }: { data: RedditPostsResponse, className?:string, mini?: boolean }) {
  const { data: session } = useSession();

  const originalData = structuredClone(data);
  const [posts, setPosts] = useState(data);
  const { alert } = useStore();
 
  return data?.error ? <Error error={data}/> : (
    <div className={className}>
      {!mini && <PostFilters data={posts} original={originalData} setData={setPosts} />}
      <div className={mini ? 'flex flex-col' : "flex flex-col gap-12 mt-4"}>
        {posts.map((post:any) => (
          post.name.substring(0, 2) === 't5' ? <Subreddit mini={mini} key={post.display_name_prefixed} post={post as IAboutSubreddit}/> :
          <Post post={post as IRedditPost} key={post.id} />
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
