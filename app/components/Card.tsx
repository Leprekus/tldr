'use client';
import React, { useState } from 'react';
import Button from './Button';
import { IRedditPost } from '@/typings';
import Alert from './Alert';
import { useSession } from 'next-auth/react';
import options from '@/lib/Options';

export default function Card({ data }: { data: IRedditPost }) {
    const { title, selftext, subreddit_name_prefixed, ups, id, likes } = data
    const { data: session } = useSession()
  const [height, setHeight] = useState('500');
  const [showMore, setShowMore] = useState(true);
  const [dimStyle, setDimStyle] = useState('opacity-100');

  const [userLikes, setUserLikes] = useState(likes)
  const [upvoteFill, setUpvoteFill] = useState(likes === 1 ? 'red' : 'gray')
  const [downvoteFill, setDownvoteFill] = useState(likes === -1 ? 'red' : 'gray')

  const [displayAlert, setDisplayAlert] = useState(false)
  const handleShowMore = () => {
    if (height === '500') {
      setHeight('fit');
      setShowMore(false);
      return;
    }
    setHeight('500');
    setShowMore(true);
    return;
  };
  const handleMouseLeave = () => {
    if (showMore) {
      setDimStyle('opacity-100');
    }
    if (!showMore) {
      setDimStyle('opacity-20 hover:opacity-100');
    }
  };

  const handleUpvote = async () => {
    const value = userLikes === 1 ? 0 : 1
    setUserLikes(value)
    const response = await fetch(options.baseUrl + 'api/user/upvote', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ id, dir: value })
        
      })
    const json = await response.json()
    console.log({ json })
    if(!response?.ok) {
        setDisplayAlert(true)
    }
    if(response.ok) {

    }

  }
  const handleDownVote = () => {

  }
  const handleComments = () => {

  }
  return (
    <>
    <div
      style={{ height: height, borderWidth: 1 }}
      className='w-full sm:w-96 bg-zinc-100 my-4 rounded-md overflow-hidden relative'
    >
      <div className='bg-zinc-50 py-4 px-6'>
        <h1 className='text-lg'>{title}</h1>
        <p>{subreddit_name_prefixed}</p>
      </div>
      <div className='p-6 h-72 overflow-hidden text-sm'>
        {showMore ? <p>tldr;</p> : <p>{selftext}</p>}
      </div>

      <div
        className={`${
          showMore ?
            'bg-gradient-to-b from-transparent to-zinc-200'
           :'bg-transparent'
        } w-full h-36 absolute bottom-24 flex items-end justify-center`}
      >
        <Button
          className={dimStyle}
          onMouseLeave={handleMouseLeave}
          onClick={handleShowMore}
          variant='secondary'
        >
          {showMore ? 'show more' : 'show less'}
        </Button>
      </div>
      <div
        style={{ borderTopWidth: 1 }}
        className='h-24 p-6 bg-zinc-50 '
      >
        <Button 
        onClick={handleUpvote}
        rounded>
            upvote
        </Button>
        <Button 
        onClick={handleDownVote}
        rounded>
            downvote
        </Button>
        <Button 
        onClick={handleComments}
        >
            comments
        </Button>
       
      </div>
    </div>
    {displayAlert && 
    <Alert 
    setDisplay={setDisplayAlert}
    message='You must be signed in to perform this action.'/>}
    </>
  );
}
