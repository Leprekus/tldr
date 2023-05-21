import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import authenticateClient from '@/utils/authenticateClient';
import { NextRequest, NextResponse } from 'next/server';

import { getCsrfToken } from 'next-auth/react';
import { init } from 'next-auth/core/init'; // You have to import it like this
import getAuthorizationUrl from 'next-auth/core/lib/oauth/authorization-url'; // You have to import it like this

import RedditWrapper from '@/lib/RedditWrapper';
import returnAccessToken from '@/utils/returnAccessToken';


export async function POST(req: Request) {
    const { link_id, ids } = await req.json()

    const url = `https://oauth.reddit.com/api/morechildren?link_id=${link_id}&children=${ids.join(',')}&depth=1&limit=10`
    
    const token = await returnAccessToken()
   
    const res = await(fetch(url, {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + token
        }
    }))
   
    const replies = await res.json()
   
    return NextResponse.json({ replies })

}


