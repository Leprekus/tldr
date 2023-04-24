import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = JSON.parse(req.body)
  var token = req.headers.authorization
  console.log({ token })
  const response = await fetch('https://oauth.reddit.com/api/vote?id= '+ id +  '&dir=1',{
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'MyRedditClient/1.0.0'
    }
  })
  if(!response.ok) {
    return res.status(409).json({ message: 'conflict' })
  }
  return res.status(200).json({ message: 'posted successfully' })
  
  }

export default handler