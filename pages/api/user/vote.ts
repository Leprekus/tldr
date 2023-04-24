import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, dir } = JSON.parse(req.body)
  var token = req.headers.authorization
  
  const response = await fetch('https://oauth.reddit.com/api/vote?id= '+ id +  '&dir=1',{
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'MyRedditClient/1.0.0'
    },
    body: JSON.stringify({
      id,
      dir
    })
  })
  if(!response.ok) {
    return res.status(409).json({ message: 'conflict' })
  }
  return res.status(200).json({ message: 'posted successfully' })
  
  }

export default handler