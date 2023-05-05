import { cookies } from 'next/dist/client/components/headers'
import RedditWrapper from './RedditWrapper'
import { decode } from 'next-auth/jwt'

const posts = async (page:{ page: 'homepage' | 'subreddit' | 'user', fallback?: string, query?: string },) => {
  
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
    const session = await decode({
      token: cookies().get('next-auth.session-token')?.value!,
      secret: process.env.NEXTAUTH_SECRET!
    })
    
   // const session = cookies().has('session') ? JSON.parse(cookies().get('session')?.value!) : null

    const redditWrapper = new RedditWrapper()
    //checks if token  is not expired
    
    if((session?.accessTokenExpires as number) > Date.now()) {
    
      console.log({ serverTOken: session })
      redditWrapper.setAccessToken(session?.accessToken as string)
      
      
      
      if(page.page === 'homepage') {
        
        const frontpage = await redditWrapper.getUserFrontPage()
        return frontpage
        
      } if(page.page === 'subreddit') {
        const subreddit = await redditWrapper.getSubreddit({ subreddit: page.query!, auth: true })
        const about = await redditWrapper.getSubredditAbout({ subreddit: page.query!, auth: true })
        return [subreddit, about]
      } if(page.page === 'user') {
        const subreddit = await redditWrapper.getSubreddit({ subreddit: page.query!, auth: true })
        const about = await redditWrapper.getSubredditAbout({ subreddit: page.query!, auth: true })
        return [subreddit, about]
      }
       
    }
    const fallback = page.fallback || page.page
    
    if(fallback === 'homepage') {

      const unauthFrontpage = await redditWrapper.getFrontPage()
      return unauthFrontpage
    }
    if(fallback === 'subreddit') {
  
      const subreddit = await redditWrapper.getSubreddit({ subreddit: page.query!, auth: false })
      const about = await redditWrapper.getSubredditAbout({ subreddit: page.query!, auth: false })
      return [subreddit, about]
  }
  
  }

  export default posts