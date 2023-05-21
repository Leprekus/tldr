import authenticateClient from '@/utils/authenticateClient';
import { NextResponse } from 'next/server';
import RedditWrapper from '@/lib/RedditWrapper';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getToken } from 'next-auth/jwt';
import returnAccessToken from '@/utils/returnAccessToken';

export async function POST(req: Request) {
    const { subreddit, id } = await req.json()
    
    const token = await returnAccessToken()
    
    const redditWrapper = new RedditWrapper(token)
    
    const comments = await redditWrapper.getComments({ subreddit, id })
   
    return NextResponse.json({ comments })

}


