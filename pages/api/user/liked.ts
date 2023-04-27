import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {  
 
  console.log({ apiToken: req.headers.user })
  const url = 'https://oauth.reddit.com/user/'+ req.headers.user + '/liked'
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'authorization': (req.headers.authorization as string),
    },
  })

  if(!response.ok) {
    return res.status(response.status).json({ message: 'Reddit: ' + response.statusText })
  }
  return res.status(200).json(response)
  
  }

export default handler