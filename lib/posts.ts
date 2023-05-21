import { cookies } from 'next/dist/client/components/headers'
import RedditWrapper from './RedditWrapper'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { IQuerySearch } from '@/typings'
import { decode } from 'next-auth/jwt'
import { getCsrfToken } from 'next-auth/react'
import authenticateClient from '@/utils/authenticateClient'
const posts = async (page:{ page: 'homepage' | 'subreddit' | 'subredditAbout' | 'user' | 'search' | 'trendingSubreddits', query?: string, term?: IQuerySearch },) => {
  
  // // session {
  //   accessToken: '62260682-EmlqDEXCjmpUg2t_eNmQ5-VXawDmCg',
  //   accessTokenExpires: 3365724057426,
  //   refreshToken: '62260682-e50D5lFvDrkwKEVf_l4HTcZiajD2iQ',
  //   user: { id: '112gne', name: 'Leprekus', image: null },
  //   iat: 1683003789,
  //   exp: 1685595789,
  //   jti: 'f437bb39-e209-4728-8fa6-d2048e27f09b'
  // }
    //const session = null
    // const session = await decode({
    //   token: cookies().get('next-auth.session-token')?.value!,
    //   secret: process.env.NEXTAUTH_SECRET!
    // })
   
    const session = await getServerSession(authOptions)

    const redditWrapper = new RedditWrapper()
    
    //console.log({ serverSession: session})
    if(session) redditWrapper.setAccessToken(session.accessToken!)
    
    switch (page.page) {
      case 'homepage':
        const frontpage = await redditWrapper.getUserFrontPage()
        return frontpage

      case 'subreddit':
        const subreddit = await redditWrapper.getSubreddit({ subreddit: page.query! })
        return subreddit

      case 'subredditAbout':
        const about = await redditWrapper.getSubredditAbout({ subreddit: page.query! })
        return about
        
      case 'trendingSubreddits':
        const trendingSubreddits = await redditWrapper.getTrendingSubreddits()
        return trendingSubreddits

      case 'user':
        const user = await redditWrapper.getUserAbout({ user: page.query! })
        return user
      case 'search':
        const result = await redditWrapper.search(page.term!)
        return result
      default:
        const defaultData = await redditWrapper.getUserFrontPage()
        return defaultData
    }  
  }

  export default posts