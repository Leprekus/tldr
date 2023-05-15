import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import authenticateClient from '@/utils/authenticateClient';
import { NextRequest, NextResponse } from 'next/server';

import { getCsrfToken } from 'next-auth/react';
import { init } from '../../../node_modules/next-auth/core/init'; // You have to import it like this
import getAuthorizationUrl from '../../../node_modules/next-auth/core/lib/oauth/authorization-url'; // You have to import it like this

import type { NextAuthOptions, Session } from 'next-auth';
import type { BuiltInProviderType } from 'next-auth/providers';
import { authOptions } from '../auth/[...nextauth]/route';
import { AuthHandler, NextAuthHandlerParams } from 'next-auth/core';
import { cookies } from 'next/dist/client/components/headers';


export async function POST(req: NextApiRequest) {


}


