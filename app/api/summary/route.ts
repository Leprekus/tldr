import authenticateClient from '@/utils/authenticateClient';
import { NextResponse } from 'next/server';
import RedditWrapper from '@/lib/RedditWrapper';
const SummarizerManager = require("node-summarizer").SummarizerManager;


export async function POST(req: Request) {
    const text = req.json()
    const summarizer = new SummarizerManager(text, 3)
    
    return NextResponse.json({  })

}


