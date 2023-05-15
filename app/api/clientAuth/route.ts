import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import authenticateClient from '@/utils/authenticateClient';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  
  return NextResponse.json({ message: 'cool' })
}

