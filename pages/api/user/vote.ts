import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, dir } = JSON.parse(req.body)
  console.log('ranranranranranranranranranranranran')
  const session = await getServerSession(authOptions)
  console.log({ voteToken: session?.accessToken })
  const params = new URLSearchParams({ id: name, dir})
  const url = 'https://oauth.reddit.com/api/vote?' + params
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'authorization': 'Bearer ' + session?.accessToken,
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'  
    },
  })

  if(!response.ok) {
    return res.status(response.status).json({ message: 'Reddit: ' + response.statusText })
  }
  return res.status(200).json({ message: response.statusText })
  
  }

export default handler