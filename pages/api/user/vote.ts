import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fullName, dir } = JSON.parse(req.body)
  //token = Bearer token
  var token = req.headers.authorization 
 
  const params = new URLSearchParams({ id: fullName, dir})
  const url = 'https://oauth.reddit.com/api/vote?' + params
   
  console.log({ url })
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'authorization': (req.headers.authorization as string),
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'  
    },
  })

  if(!response.ok) {
    return res.status(response.status).json({ message: response.statusText })
  }
  return res.status(200).json({ message: response.statusText })
  
  }

export default handler