import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
export async function POST (req: Request, res: NextApiResponse) {
  
  const body = await req.json()
  const { name, dir } = body

  //token = Bearer token
  const bearer = req.headers.get('authorization') 
  const params = new URLSearchParams({ id: name, dir})
  const url = 'https://oauth.reddit.com/api/vote?' + params
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'authorization': (bearer as string),
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'  
    },
  })

  if(!response.ok) {
    return res.status(response.status).json({ message: 'Reddit: ' + response.statusText })
  }
  return NextResponse.json({ message: response.statusText})
  return res.status(200).json({ message: response.statusText })
  
  }
