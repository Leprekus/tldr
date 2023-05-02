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
import Image from 'next/image';

export default function Card({ data }: { data: IRedditPost }) {
    const { 
      title, 
      selftext, 
      subreddit_name_prefixed, 
      ups, 
      id, 
      likes,
      name,
      url,
      thumbnail,
     } = data
  
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
        body: JSON.stringify({ name, dir: value })
        
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

  console.log({ data })
  return (
    <>
    <div
      style={{ height: height }}
      className='w-full bg-white my-4 rounded-md 
      overflow-hidden transition-all shadow-md shadow-zinc-100 flex flex-row'
    >
      {/* action bar */}
      <div
        className='min-h-full w-20 px-10 py-8 flex justify-center'
      >
        <div className='flex flex-col'>
          <div className='flex gap-y-3 flex-col'>
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
        </div>
       
      </div>

       {/* header body and footer */}
       <div>
      <div className='pt-8 px-6'>
        <h1 className='text-lg'>{title}</h1>
        <Link href={subreddit_name_prefixed}><Button variant='ghost'>{subreddit_name_prefixed}</Button></Link>
      </div>
        
          <div className='h-36 min-w-full overflow-hidden text-sm relative py-4 bg-red-400'>
            {/* text post */}
            {selftext && (
            <>
            {showMore ? <p>tldr;</p> : <p>{selftext}</p>}
            
              <div
              className={`w-full h-36 absolute bottom-0 flex items-end justify-center`}
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
            </>
            )}
            {/* link */}
            {
              thumbnail?.includes('https') && 
              <><Image src={thumbnail} width={64} height={64} alt='thumbnail'/></>
            }
        </div>

        <div className='h-24 py-4 border-t-1 border-zinc-200' style={{ borderTopWidth: 1 }}>
          <p>footer</p>
          <Button
            onClick={handleComments}
            >c</Button>
        </div>
      </div>

      <div className='min-h-full w-20 px-10 py-12 flex justify-center '/>

    </div>
    {displayAlert && 
    <Alert 
    setDisplay={setDisplayAlert}
    message='You must be signed in to perform this action.'/>}
    </>
  );
}
