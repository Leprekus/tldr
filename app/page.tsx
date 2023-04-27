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
  const session = JSON.parse(cookies().get('session')?.value!)
  
  const redditWrapper = new RedditWrapper(session.accessToken)
 
  if(!session) {
    const unauthFrontpage = await redditWrapper.getFrontPage()
    return [ unauthFrontpage ]
  }
  
  

const [frontpage, upvoted, downvoted] = 
  await Promise.all([
      //reddit homepage
  redditWrapper.getUserFrontPage(),

  //upvoted posts
  redditWrapper.getUpvoted(session.name),

  //downvoted posts
  redditWrapper.getDownvoted(session.name)

  ])
    .catch(async (error) => {
      console.log({ FailedToResolvePromises: error})
      const unauthFrontpage = await redditWrapper.getFrontPage()

      return [unauthFrontpage, null, null ]

    })
    .catch(error => {
      console.log({ PromiseErro: error})
      return [null, null, null]
    });

  return [ frontpage, upvoted, downvoted ]

}
export default async function Home() {

  //posts can return [ unauthFrontpage ] or [frontpage, upvoted, downvoted]
  const [frontpage, upvoted, downvoted] = await posts()

  if(!frontpage) {
    return <p>something went wrong</p>
  }

  if(upvoted && downvoted) {
    //mix frontpage with upvote & downvote
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    <List data={frontpage}/>
   
    </main>
  )
}
