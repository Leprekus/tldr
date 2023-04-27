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
 
  if(!session) {
    const response = await fetch('https://www.reddit.com/.json?sort=new', { next: { revalidate: 300 }})
    const json = await response.json()
    return json
  }
 const options = { 
  //next: { revalidate: 300 },
  method: 'GET',
  headers: {
    authorization: 'Bearer ' + session.accessToken,
  },
}

const userFrontPage = async () => {
  //works
  const response = await fetch('https://oauth.reddit.com/.json?sort=new', options)
  const json = await response.json()
  const posts = json.data.children.map((post:RedditPostsResponse) => post.data)

  return posts
}

const userUpvotes = async () => {
  //works
  const response = await fetch('https://oauth.reddit.com/user/'+ session.name + '/upvoted', options)
  const json = await response.json()

  const posts = json.data.children.map((post:RedditPostsResponse) => ({
    [post.data.id]: post.data.likes
  }))

  return posts
}

const userDownvotes = async () => {
  //works
  const response = await fetch('https://oauth.reddit.com/user/'+ session.name + '/downvoted', options)
  const json = await response.json()
  const posts = json.data.children.map((post:RedditPostsResponse) => ({
    [post.data.id]: post.data.likes
  }))
  
  return posts
}
const redditWrapper = new RedditWrapper(session.accessToken)

const promises = [
  //reddit homepage
  redditWrapper.getUserFrontPage(),

  //upvoted posts
  redditWrapper.getUpvoted(session.name),

  //downvoted posts
  redditWrapper.getDownvoted(session.name)
  
  //test
  


];

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
      const response = await fetch('https://www.reddit.com/.json?sort=new', { next: { revalidate: 300 }})
      const json = await response.json()
      const posts = json.data.children.map((post:RedditPostsResponse) => post.data)

      return [posts, [], [] ]

    })
    .catch(error => {
      console.log({ PromiseErro: error})
      return [[], [], []]
    });

    console.log({ frontpage: frontpage[0], upvoted: upvoted[0], downvoted: downvoted[0] })

  



/////////////
 const response = await fetch('https://www.reddit.com/.json?sort=new', { next: { revalidate: 300 }})
 const json = await response.json()
 return json


}
export default async function Home() {

  const data: RedditPostsResponse = await posts()

  
  const postsData = data.data.children.map((post:RedditPostsResponse) => post.data)
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    <List data={postsData}/>
   
    </main>
  )
}
