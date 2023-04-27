import { Inter } from 'next/font/google'
import { IRedditPost, RedditPostsResponse } from '@/typings'
import List from './components/Posts/List'

import { cookies } from 'next/dist/client/components/headers'
import RedditWrapper from '@/lib/RedditWrapper'
import posts from '@/lib/posts'


const inter = Inter({ subsets: ['latin'] })

export const revalidate = 300;

const preload = () => {
  posts({ page: 'homepage'})
}
// const posts = async (page:{ page: string, fallback?: string },) => {
//   page.fallback ? page.fallback : page.page

//   // session {
//   //   accessToken: xxxx,
//   //   name: john doe
//   // }
//   //const session = null
//   const session = JSON.parse(cookies().get('session')?.value!)
  
//   const redditWrapper = new RedditWrapper()
 
//   if(!session) {

//     if(page.fallback === 'homepage') {
//       const unauthFrontpage = await redditWrapper.getFrontPage()
//       return unauthFrontpage
//     }
//     if(page.fallback === 'subreddit') {
//       const unauthFrontpage = await redditWrapper.getFrontPage()
//       return unauthFrontpage
//     }


//   }

//   redditWrapper.setAccessToken(session.accessToken)

//   if(page.page === 'homepage') {

//     const frontpage = await redditWrapper.getUserFrontPage(session.name)
//     return frontpage

//   } if(page.page === 'subreddit') {
//     const subreddit = await redditWrapper.getSubreddit('reddit')
//     return subreddit
//   }

// }
export default async function Home() {

  //posts can return [ unauthFrontpage ] or [frontpage, upvoted, downvoted]
  const frontpage = await posts({ page: 'homepage' })

  if(!frontpage) {
    return <p>something went wrong</p>
  }

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    <List data={frontpage}/>
   
    </main>
  )
}
