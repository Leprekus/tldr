import authenticateClient from '@/utils/authenticateClient';
import { NextResponse } from 'next/server';
import RedditWrapper from '@/lib/RedditWrapper';

export async function POST(req: Request) {
    const { subreddit, id } = await req.json()
    const clientToken = await authenticateClient()
    const redditWrapper = new RedditWrapper()
    redditWrapper.setAccessToken(clientToken.access_token)
    const comments = await redditWrapper.getComments({ subreddit, id })
   
    return NextResponse.json({ comments })

}


