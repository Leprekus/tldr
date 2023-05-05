import NextAuth, { Account, Session, User } from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';
import { JWT, getToken } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';
import refreshAccessToken from '@/utils/refreshAccessToken';

// 1. getServerSession
// 2. if (!user) use client
// 3. fetch posts
export const authOptions = {
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
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(params: {
      token: JWT;
      user: User;
      account: Account | null;
    }) {
      const { token, user, account } = params;
   
      // Initial sign in
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
        session.user = token.user;
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
export default NextAuth(authOptions);

