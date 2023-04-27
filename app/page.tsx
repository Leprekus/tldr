import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Card from './components/Card'
import { IRedditPost, RedditPostsResponse } from '@/typings'
import Pill from './components/Pill'
import PostFilters from './components/PostFilters'
import List from './components/Posts/List'
import options from '@/lib/Options'
import { getServerSession } from 'next-auth'
import authOptions from '../pages/api/auth/[...nextauth]'
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'

import { getCookie } from 'cookies-next'
import { cookies } from 'next/dist/client/components/headers'
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
  next: { revalidate: 300 },
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

  console.log({ success: 'esdf'})
  
  return posts
}

const promises = [
  //reddit homepage
  userFrontPage(),

  //upvoted posts
  userUpvotes(),

  //downvoted posts
  userDownvotes()

];

const [userHomepage, upvoteIds, downvoteIds] = 
  await Promise.all([promises])
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
