import { Inter } from 'next/font/google'
import { IRedditPost, RedditPostsResponse } from '@/typings'
import List from './components/Posts/List'

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
  //const session = null
  const session = JSON.parse(cookies().get('session')?.value!)
  
  const redditWrapper = new RedditWrapper()
 
  if(!session) {

    const unauthFrontpage = await redditWrapper.getFrontPage()
    return unauthFrontpage
  }

  redditWrapper.setAccessToken(session.accessToken)

  const frontpage = await redditWrapper.getUpvoted(session.name)
  
  return frontpage

}
export default async function Home() {

  //posts can return [ unauthFrontpage ] or [frontpage, upvoted, downvoted]
  const frontpage = await posts()

  if(!frontpage) {
    return <p>something went wrong</p>
  }

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    <List data={frontpage}/>
   
    </main>
  )
}
