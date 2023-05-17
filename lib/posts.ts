import { cookies } from 'next/dist/client/components/headers'
import RedditWrapper from './RedditWrapper'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { IQuerySearch } from '@/typings'
import { decode } from 'next-auth/jwt'
import { getCsrfToken } from 'next-auth/react'
import authenticateClient from '@/utils/authenticateClient'
const posts = async (page:{ page: 'homepage' | 'subreddit' | 'subredditAbout' | 'user' | 'search', fallback?: string, query?: string, term?: IQuerySearch },) => {
  
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
    if(session) {
      
      redditWrapper.setAccessToken(session.accessToken!)
    
      
      if(page.page === 'homepage') {
        
        const frontpage = await redditWrapper.getUserFrontPage()
        return frontpage
        
      } if(page.page === 'subreddit') {
        
        const subreddit = await redditWrapper.getSubreddit({ subreddit: page.query!, auth: true })
        return subreddit

      } if(page.page === 'subredditAbout') {
        
        const about = await redditWrapper.getSubredditAbout({ subreddit: page.query!, auth: true })
        return about

      }if(page.page === 'user') {

        const user = await redditWrapper.getUserAbout({ user: page.query!, auth: true })
        return user
      } if(page.page === 'search') {
        const data = await redditWrapper.search(page.term!)
        return data
      }
       
    }
    const fallback = page.fallback || page.page
    
    if(fallback === 'homepage') {

      const unauthFrontpage = await redditWrapper.getFrontPage()
      return unauthFrontpage
    }
    if(page.page === 'subreddit') {
        
      const subreddit = await redditWrapper.getSubreddit({ subreddit: page.query!, auth: false })
      return subreddit

    } if(page.page === 'subredditAbout') {
      
      const about = await redditWrapper.getSubredditAbout({ subreddit: page.query!, auth: false })
      return about

    }
    if(fallback === 'user') {
  
      const user = await redditWrapper.getUserAbout({ user: page.query!, auth: false })
      return user
  } if(page.page === 'search') {
    const data = await redditWrapper.search(page.term!)
    return data
  }
  
  }

  export default posts