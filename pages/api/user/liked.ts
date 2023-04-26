import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {  
 
  console.log({ apiToken: req.headers.authorization })
  const url = 'https://oauth.reddit.com/user/leprekus/liked'
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'authorization': (req.headers.authorization as string),
    },
  })

  if(!response.ok) {
    return res.status(response.status).json({ message: response.statusText })
  }
  return res.status(200).json({ message: (await response.json()) })
  
  }

export default handler