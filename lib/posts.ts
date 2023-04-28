import { cookies } from 'next/dist/client/components/headers'
import RedditWrapper from './RedditWrapper'

const posts = async (page:{ page: string, fallback?: string, query?: string },) => {
    page.fallback ? page.fallback : page.page
  
    // session {
    //   accessToken: xxxx,
    //   name: john doe
    // }
    //const session = null
    const session = JSON.parse(cookies().get('session')?.value!)
    
    const redditWrapper = new RedditWrapper()
   
    if(session === null) {
  
      if(page.fallback === 'homepage') {
        const unauthFrontpage = await redditWrapper.getFrontPage()
        return unauthFrontpage
      }
      if(page.fallback === 'subreddit') {
    
        const unauthFrontpage = await redditWrapper.getSubreddit({ subreddit: page.query!, auth: false })
        return unauthFrontpage
      }
  
  
    }
  
    redditWrapper.setAccessToken(session.accessToken)
  
    if(page.page === 'homepage') {
  
      const frontpage = await redditWrapper.getUserFrontPage()
      return frontpage
  
    } if(page.page === 'subreddit') {
      const subreddit = await redditWrapper.getSubreddit({ subreddit: page.query!, auth: true })
      return subreddit
    }
  
  }

  export default posts