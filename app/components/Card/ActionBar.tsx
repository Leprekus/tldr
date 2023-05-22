import React, { useState } from 'react'
import Button from '../Button'
import { CommentIcon, DownvoteIcon, TrophyIcon, UpvoteIcon } from '../Icons'
import { useSession } from 'next-auth/react';
import { IRedditComment, IRedditPost } from '@/typings';
import useStore from '@/app/hooks/store';


function isRedditPost(post: any): post is IRedditPost {
    if('title' in post) return true
    return false
  }

export default function ActionBar({ post, padding='px-10 py-8' }: { post: IRedditComment | IRedditPost, padding?: 'px-10 py-8' | 'pr-1'}) {
    const { data: session } = useSession()
    const [isLiked, setIsLiked] = useState<boolean | null>(post.likes);

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
          if (!session || session.user.id === 'RedditClientCredentials') {
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
    <div
    className={'h-fit w-full md:min-h-full md:w-20 flex justify-center ' + padding}>
     <div className='flex gap-x-16 md:flex-col'>
       <div className='flex gap-3 flex-row md:flex-col'>
         <Button onClick={() => handleVote('up')} variant='ghost'>
           <UpvoteIcon fill={isLiked ? '#3B82F6' : '#A9A9A9'} />
         </Button>

         <Button onClick={() => handleVote('down')} variant='ghost'>
           <DownvoteIcon
             fill={!isLiked && isLiked !== null ? '#3B82F6' : '#A9A9A9'}
           />
         </Button>
       </div>
       {
        isRedditPost(post) &&
        <>
        <Button variant='ghost' rounded>
         <TrophyIcon fill='#A9A9A9'/>
       </Button>
       <Button variant='ghost' rounded onClick={handleComments}>
         <CommentIcon fill='none'strokeWidth={2} stroke='#A9A9A9'/>
       </Button>
       </>
       }
     </div>
   </div>
  )
}
