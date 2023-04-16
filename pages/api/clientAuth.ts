import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
const Redis = require('redis')

const client = Redis.createClient({ url: process.env.HOST_URL || 'http://localhost:3000/'})
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  return res.status(200).json({ message: 'scucess'})
  }

export default handler