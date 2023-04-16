import { Snowburst_One } from 'next/font/google';
import snoowrap from 'snoowrap';

const Snoowrap = new snoowrap({
    userAgent: 'web:com.example.myredditapp:v1.0.0 (by /u/leprekus)',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken: undefined,
    accessToken: undefined,
  });
  
export default Snoowrap
