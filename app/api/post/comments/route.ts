import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
const POST: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { subreddit, id } = JSON.parse(req.body)
  //token = Bearer token
  var token = req.headers.authorization 
 
  const url = 'https://oauth.reddit.com/r/'+ subreddit + '/comments/' + id + '.json' 

  const headers = {
    'authorization': (req.headers.authorization as string),
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
  })

  if(!response.ok) {
    return res.status(response.status).json({ message: 'Reddit: ' + response.statusText })
  }
  return res.status(200).json({ message: response.statusText })
  
  }

export default POST