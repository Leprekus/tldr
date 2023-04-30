import { cookies } from 'next/dist/client/components/headers'
import RedditWrapper from './RedditWrapper'

const posts = async (page:{ page: string, fallback?: string, query?: string },) => {
  
  // session {
    //   accessToken: xxxx,
    //   name: john doe,
    //   accessTokenExpires: date * 1000
    // }
    //const session = null
    const session = JSON.parse(cookies().get('session')?.value!)
    
    const redditWrapper = new RedditWrapper()
    //checks if token  is not expired
    if(session?.accessTokenExpires > Date.now()) {
      console.log({ serverTOken: session.accessToken})
      redditWrapper.setAccessToken(session.accessToken)
      
      if(page.page === 'homepage') {
        
        const frontpage = await redditWrapper.getUserFrontPage()
        return frontpage
        
      } if(page.page === 'subreddit') {
        const subreddit = await redditWrapper.getSubreddit({ subreddit: page.query!, auth: true })
        const about = await redditWrapper.getSubredditAbout({ subreddit: page.query!, auth: true })
        return [subreddit, about]
      }
       
    }
    const fallback = page.fallback ||page.page
    
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