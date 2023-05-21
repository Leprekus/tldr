'use client';
import React, { ReactNode, useState } from 'react';
import Button from '../Button';
import { IRedditComment, IRedditPost } from '@/typings';
import Link from 'next/link';
import Paper from './Paper';
import ActionBar from './ActionBar';

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

  return (
    <>
      <Paper>
        <ActionBar post={post}/>

        {/* header */}
        <div className='w-80 md:w-full flex flex-col gap-y-2'>
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
        {isRedditPost(post) && <div className='min-h-full min-w-[80px]' />}
      </Paper>
    </>
  );
}
