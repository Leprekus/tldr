
import About from '@/app/components/Subreddit/AboutSubreddit';
import Card from '@/app/components/Card/Card';
import List from '@/app/components/Posts/List';
import RedditWrapper from '@/lib/RedditWrapper';
import posts from '@/lib/posts';
import { IRedditPost, RedditPostsResponse } from '@/typings';
import React from 'react'

export default async function User({ params }: { params: { user: string } }) {
   // Set the Reddit API endpoint and subreddit name
   const user = await posts({ page: 'user', query: params.user})
   /*
    kind: 't2',
    data: {
      is_employee: false,
      is_friend: false,
      subreddit: [Object],
      snoovatar_size: null,
      awardee_karma: 0,
      id: 'a1ai2nfhd',
      verified: true,
      is_gold: false,
      is_mod: false,
      awarder_karma: 0,
      has_verified_email: false,
      icon_img: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png',
      hide_from_robots: true,
      link_karma: 1735,
      pref_show_snoovatar: false,
      is_blocked: false,
      total_karma: 2149,
      accept_chats: false,
      name: 'NewfieLab',
      created: 1682509412,
      created_utc: 1682509412,
      snoovatar_img: '',
      comment_karma: 414,
      accept_followers: true,
      has_subscribed: true,
      accept_pms: true
    }
  }
}

   */


  return (
    
    <main className="flex min-h-screen items-start justify-center gap-x-4 p-4">

        <About data={user}/>
        {/* <List data={user}/> */}
        {/* <div className='w-96 h-96 bg-red-500'/> */}
    </main>
  )
}
