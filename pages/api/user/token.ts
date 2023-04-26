
import { createToken } from '@/lib/redis';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {  
 
    console.log({ tokenBody: req.body })
    //const id = await createToken(req.body)
//   if(!response.ok) {
//     return res.status(response.status).json({ message: response.statusText })
//   }
  return res.status(200).json({ message: req.body })
  
  }

export default handler