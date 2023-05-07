'use client';
import React, { ReactNode, useState } from 'react';
import Button from '../Button';
import { IInitialState, IRedditComment, IRedditPost } from '@/typings';
import Alert from '../Alert';
import { useSession } from 'next-auth/react';
import { CommentIcon, DownvoteIcon, TrophyIcon, UpvoteIcon } from '../Icons';
import Link from 'next/link';
import useStore from '@/app/hooks/store';
import Paper from './Paper';

interface PostProps {
  post: IRedditPost | IRedditComment;
}

function isRedditPost(post: any): post is IRedditPost {
  if('title' in post) return true
  return false
}
export default function Card({
  post,
  children,
  header,
  link
}: {
  post: IRedditPost | IRedditComment;
  header?: string;
  link: string;
  children: ReactNode;
}) {
  const { data: session } = useSession();

  const [isLiked, setIsLiked] = useState<boolean | null>(post.likes);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState<'informational' | 'warning'>(
    'informational'
  );

  const {
    setCurrentCommentId,
    removeCurrentCommentId,
    comments,
    alert,
   } = useStore()
 
  const handleVote = async (direction: string) => {
    //id is fullname of a thing = ex t3_id
    let value = 0;
    if (direction === 'up') value = isLiked ? 0 : 1;
    if (direction === 'down') value = isLiked === false ? 0 : -1;

    const response = await fetch('/api/user/vote', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({ name: post.name, dir: value }),
    });
    
    try {
      const json = await response.json();
      console.log({ message: json.message });
      if (!session) {
        alert.setMessage('You must be signed in to perform this action');
        alert.setDisplay(true);
        return
      }

      if (response.ok) {
        if (value === -1) setIsLiked(false);
        if (value === 0) setIsLiked(null);
        if (value === 1) setIsLiked(true);
      }
    } catch (error) {
      console.log(error);
      if (!response.ok) {
        alert.setMessage('Unable to complete request');
        alert.setSeverity('warning');
        alert.setDisplay(true);
      }
    }
  
  };
  
  const handleComments = () => {
    if(comments.currentCommentId === post.id) {
      return removeCurrentCommentId()
    }
    return setCurrentCommentId(post.id)
  };
  return (
    <>
      <Paper sx={{ maxWidth: isRedditPost(post) ? 500 : 320 }}>
        {/* action bar */}  
        <div
         className='min-h-full w-20 px-10 py-8 flex justify-center'>
          <div className='flex flex-col'>
            <div className='flex gap-y-3 flex-col'>
              <Button onClick={() => handleVote('up')} variant='ghost'>
                <UpvoteIcon fill={isLiked ? '#3B82F6' : '#A9A9A9'} />
              </Button>

              <Button onClick={() => handleVote('down')} variant='ghost'>
                <DownvoteIcon
                  fill={!isLiked && isLiked !== null ? '#3B82F6' : '#A9A9A9'}
                />
              </Button>
            </div>
            <Button variant='ghost' rounded>
              <TrophyIcon fill='#A9A9A9'/>
            </Button>
            <Button variant='ghost' rounded onClick={handleComments}>
              <CommentIcon fill='none'strokeWidth={2} stroke='#A9A9A9'/>
            </Button>
          </div>
        </div>

        {/* header */}
        <div style={{ maxWidth: 340 }} className='w-full flex flex-col gap-y-2'>
          <div className='pt-8 pb-2'>
           
           
            {header && <h1 className='text-lg font-bold text-gray-700'>{header}</h1>}
            {link && !link.includes('[deleted]') &&
              <Link href={link}>
              <Button variant='ghost' className='text-gray-600'>
                {link}
              </Button>
            </Link>}
            
          </div>
          {/* body */}
          {children}
        </div>
        {isRedditPost(post) && <div className='min-h-full w-20' />}
      </Paper>
    </>
  );
}
