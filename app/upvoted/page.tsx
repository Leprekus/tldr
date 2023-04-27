import { Inter } from 'next/font/google'
import { IRedditPost, RedditPostsResponse } from '@/typings'
import List from '../components/Posts/List'

import { cookies } from 'next/dist/client/components/headers'
import RedditWrapper from '@/lib/RedditWrapper'


const inter = Inter({ subsets: ['latin'] })

export const revalidate = 300;

const preload = () => {
  posts()
}
const posts = async () => {

  // session {
  //   accessToken: xxxx,
  //   name: john doe
  // }
  const session = JSON.parse(cookies().get('session')?.value!)
  
  const redditWrapper = new RedditWrapper(session.accessToken)
 
  if(!session) {
    const unauthFrontpage = await redditWrapper.getFrontPage()
    return [ unauthFrontpage ]
  }
  
  
return await redditWrapper.getUpvoted(session.name)



}
export default async function Upvoted() {

  const data = await posts()
  console.log(data[0])
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    <List data={data}/>
   
    </main>
  )
}
