'use client';
import React, { ReactNode, useState } from 'react';
import Button from '../Button';
import { IRedditPost } from '@/typings';
import Alert from '../Alert';
import { useSession } from 'next-auth/react';
import options from '@/lib/Options';
import { DownvoteIcon, TrophyIcon, UpvoteIcon } from '../Icons';
import Link from 'next/link';
import Pill from '../Pill';
import Image from 'next/image';

export default function Card({ post, children }: { post: IRedditPost, children: ReactNode }) {
  
  
    const { data: session } = useSession()


  
  const [ isLiked, setIsLiked] = useState<boolean | null>(post.likes)
  const [upvoteFill, setUpvoteFill] = useState(isLiked ? 'red' : 'gray')
  const [downvoteFill, setDownvoteFill] = useState(isLiked ? 'red' : 'gray')

  const [displayAlert, setDisplayAlert] = useState(false)
 
  

  const handleVote = async (direction: string) => {
    //id is fullname of a thing = ex t3_id
    let value = 0;
    if(direction === 'up') value = isLiked ? 0 : 1;
    if(direction === 'down') value = isLiked === false ? 0 : -1;

    
    const response = await fetch('api/user/vote', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ name: post.name, dir: value })
        
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
      style={{ maxWidth: 600 }}
      className='w-full bg-white my-4 rounded-md h-fit
      overflow-hidden transition-all shadow-md shadow-zinc-100 flex flex-row justify-stretch'
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

       {/* header */}
       <div 
       style={{ maxWidth: 440}}
       className='w-full flex flex-col gap-y-2'>
      <div className='pt-8 pb-2'>
        <h1 className='text-lg font-bold text-gray-700'>{post.title}</h1>
        <Link href={post.subreddit_name_prefixed}><Button variant='ghost' className='text-gray-600'>{post.subreddit_name_prefixed}</Button></Link>
      </div>
          {/* body */}
          { children }

        {/* footer */}
  
      </div>

      <div className='min-h-full w-20'/>

    </div>
    {displayAlert && 
    <Alert 
    setDisplay={setDisplayAlert}
    message='You must be signed in to perform this action.'/>}
    </>
  );
}
