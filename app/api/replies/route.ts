import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import authenticateClient from '@/utils/authenticateClient';
import { NextRequest, NextResponse } from 'next/server';

import { getCsrfToken } from 'next-auth/react';
import { init } from '../../../node_modules/next-auth/core/init'; // You have to import it like this
import getAuthorizationUrl from '../../../node_modules/next-auth/core/lib/oauth/authorization-url'; // You have to import it like this

import RedditWrapper from '@/lib/RedditWrapper';


export async function POST(req: Request) {
    const { link_id, ids } = await req.json()

    const url = `https://oauth.reddit.com/api/morechildren?link_id=${link_id}&children=${ids}`
    const clientToken = await authenticateClient()
   
    const res = await(fetch(url, {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + clientToken.access_token    
        }
    }))
    const replies = await await res.json()
   
    return NextResponse.json({ replies })

}


