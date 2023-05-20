import authenticateClient from '@/utils/authenticateClient';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    const text = await req.json()
    return NextResponse.json({ summary: text })

}


