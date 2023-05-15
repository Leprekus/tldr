import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import authenticateClient from '@/utils/authenticateClient';
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const clientToken = await authenticateClient()
  console.log({ clientToken})
  return res.status(200).json({ clientToken })

}

export default handler