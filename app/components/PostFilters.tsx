'use client'
import React from 'react'
import Pill from './Pill'
import { IRedditPost, RedditPostsResponse } from '@/typings'

export default function PostFilters({ data, original, setData }: { data : RedditPostsResponse ,original : RedditPostsResponse, setData: Function}) {

    const sortTrending = () => {
        //highest upvote ratio
        const trendingPosts = data 
        .map((post: IRedditPost) => post)
        .sort((a:IRedditPost, b:IRedditPost) => a.upvote_ratio > b.upvote_ratio ? -1 : 1)
        setData(trendingPosts)
    }
    const sortHot = () => {
     //highest overall upvotes
      const hotPosts = data 
      .map((posts:IRedditPost) => posts)
      .sort((a:IRedditPost, b:IRedditPost) => a.ups > b.ups ? -1 : 1)
      setData(hotPosts)
    }

    const sortControversial = () => {
        //highest upvote number &
        //higher downvote ratio = higher ranking
        const controversialPosts = data 
        .map((posts:RedditPostsResponse) => posts)
        .sort((a:IRedditPost, b:IRedditPost) => {
            const aDowns = Math.floor(a.ups * a.upvote_ratio - a.ups);
            const bDowns = Math.floor(b.ups * b.upvote_ratio - b.ups);
            const aControversy = a.ups / (a.ups + aDowns) - a.upvote_ratio;
            const bControversy = b.ups / (b.ups + bDowns) - b.upvote_ratio;
            return bControversy - aControversy;
        })

        setData(controversialPosts)
    }

    const clearFilters = () => {
        setData(original)
        }

    return (
    <div>
    <Pill onClick={sortTrending}>Trending</Pill>
    <Pill onClick={sortHot}>Hot</Pill>
    <Pill onClick={sortControversial}>Controversial</Pill>
    <Pill onClick={clearFilters}>Clear</Pill>
  </div>
  )
}
