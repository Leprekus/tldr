'use client';
import React, { useState } from 'react';
import Button from './Button';
import { IRedditPost } from '@/typings';
import Alert from './Alert';
import { useSession } from 'next-auth/react';
import options from '@/lib/Options';
import { DownvoteIcon, TrophyIcon, UpvoteIcon } from './Icons';
import Link from 'next/link';
import Pill from './Pill';

export default function Card({ data }: { data: IRedditPost }) {
    const { title, selftext, subreddit_name_prefixed, ups, id, likes } = data
  
    const { data: session } = useSession()

  const [height, setHeight] = useState('500');
  const [showMore, setShowMore] = useState(true);
  const [dimStyle, setDimStyle] = useState('opacity-100');

  
  const [ isLiked, setIsLiked] = useState<boolean | null>(likes)
  const [upvoteFill, setUpvoteFill] = useState(isLiked ? 'red' : 'gray')
  const [downvoteFill, setDownvoteFill] = useState(isLiked ? 'red' : 'gray')

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

  const handleVote = async (direction: string) => {
    //id is fullname of a thing = ex t3_id
    let value = 0;
    if(direction === 'up') value = isLiked ? 0 : 1;
    if(direction === 'down') value = isLiked === false ? 0 : -1;

    const fullName = 't3_' + id
    
    const response = await fetch(options.baseUrl + 'api/user/vote', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ fullName, dir: value })
        
      })
    const json = await response.json()
    console.log({ message: json.message })
    if(response.status === 401) {
      setDisplayAlert(true)
  }
    if(response.ok) {
      if(value === -1) setIsLiked(false)
      if(value === 0) setIsLiked(null)
      if(value === 1) setIsLiked(true)
   
    }

  }

  const handleComments = () => {

  }
  return (
    <>
    <div
      style={{ height: height, borderWidth: 1 }}
      className='w-full bg-zinc-100 my-4 rounded-md 
      overflow-hidden relative transition-all shadow-md'
    >
      <div className='bg-zinc-50 py-4 px-6'>
        <h1 className='text-lg'>{title}</h1>
        <Link href={subreddit_name_prefixed}><Button variant='ghost'>{subreddit_name_prefixed}</Button></Link>
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
        className='h-24 p-6 bg-zinc-50'
      >
        <div className='flex justify-between'>
          <div className='flex gap-x-3'>


              <Button
              onClick={() => handleVote('up')}
              variant='ghost'
              >
                <UpvoteIcon fill={isLiked ? '#3B82F6' : '#A9A9A9'}/>
              </Button>
            


            
              <Button
              onClick={() => handleVote('down')}
              variant='ghost'
              >
                <DownvoteIcon fill={!isLiked && isLiked !== null ? '#3B82F6' : '#A9A9A9'}/>
              </Button>
    

          </div>
          <Button variant='ghost' rounded><TrophyIcon/></Button>
            <Button
            onClick={handleComments}
            >
              comments
          </Button>
        </div>
       
      </div>
    </div>
    {displayAlert && 
    <Alert 
    setDisplay={setDisplayAlert}
    message='You must be signed in to perform this action.'/>}
    </>
  );
}
