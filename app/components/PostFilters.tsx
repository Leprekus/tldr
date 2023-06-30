'use client'
import React, { useState } from 'react'
import Pill from './ui/Pill'
import { IRedditPost, RedditPostsResponse } from '@/typings'

export default function PostFilters({ data, original, setData }: { data : RedditPostsResponse ,original : RedditPostsResponse, setData: Function}) {

    const [active, setActive] = useState('')
    const bg = 'bg-red-400'
    //let bg = 'bg-opacity-20'
    const sortTrending = () => {
        setActive('trending')
        //highest upvote ratio
        const trendingPosts = data 
        .map((post: IRedditPost) => post)
        .sort((a:IRedditPost, b:IRedditPost) => a.upvote_ratio > b.upvote_ratio ? -1 : 1)
        setData(trendingPosts)
    }
    const sortHot = () => {
       setActive('hot')
     //highest overall upvotes
      const hotPosts = data 
      .map((posts:IRedditPost) => posts)
      .sort((a:IRedditPost, b:IRedditPost) => a.ups > b.ups ? -1 : 1)
      setData(hotPosts)
    }

    const sortControversial = () => {
        setActive('controversial')
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
        setActive('')
        setData(original)
        }

    return (
    <div className='flex gap-x-4 w-fit mx-auto mt-4'>
    <Pill onClick={sortTrending} className={active === 'trending' ? bg : ''}>Trending</Pill>
    <Pill onClick={sortHot} className={active === 'hot' ? bg : ''}>Hot</Pill>
    <Pill onClick={sortControversial} className={active === 'controversial' ? bg : ''}>Controversial</Pill>
    <Pill onClick={clearFilters} className={active === 'clear' ? '' : ''}>Clear</Pill>
  </div>
  )
}
