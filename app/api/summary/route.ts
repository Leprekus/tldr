import authenticateClient from '@/utils/authenticateClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const text = await req.json()
    // const summary = await summarizer(text, {
    //     n:3,
    //     lang:'ID',
    //     raw:true
    // })
    // console.log({ summary })
    return NextResponse.json({ summary: text })

}


