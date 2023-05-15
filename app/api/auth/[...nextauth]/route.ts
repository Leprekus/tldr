import NextAuth, { Account, NextAuthOptions, Session, User } from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';
import { JWT, getToken } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';
import refreshAccessToken from '@/utils/refreshAccessToken';
import Credentials from 'next-auth/providers/credentials';
import { IClientToken } from '@/typings';
import authenticateClient from '@/utils/authenticateClient';


// 1. getServerSession
// 2. if (!user) use client
// 3. fetch posts
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      authorization: {
        params: {
          duration: 'permanent',
          scope: '*',
        },
      },
    }),
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'RedditClientCredentials',
      id: 'redditclientcredentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {},
      async authorize(credentials, req) {
     
        const clientToken = await authenticateClient()
        const user: User = {
          id:'RedditClientCredentials',
          name: 'client',
          ...clientToken,
          
        }
        return user 
      },
    }),
 
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // async signIn({ user, account }) {
    //   const clientToken = await authenticateClient()
    //   console.log('rrrrrrrrrran')
    //   account && (account.access_token = clientToken.access_token)
    //   console.log('token seeeeeeeet')
    //  return true
    // },
    async jwt(params: {
      token: JWT;
      user: User;
      account: Account | null;
    }) {
      const { token, user, account } = params;
      //jwt returns token
   
      // Initial sign in
      if(account?.provider === 'RedditClientCredentials') {
        return {
          accessToken: user.access_token,
          accessTokenExpires: Date.now() + (user.expires_in as number) * 1000,
          refreshToken: null,
          user,
        };
      }
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account.expires_at as number) * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to update it
      return await refreshAccessToken(token);
    },
    async session(params: { session: Session; token: JWT; user: AdapterUser }) {
      const { session, token, user } = params;

      if(token) {
        session.user = (token.user as User);
        session.accessToken = (token.accessToken as string);
        session.error = (token.error as string); 
      }
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken as string;
      // session.user = token.user as User;
      return session;
    },
  },
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }

