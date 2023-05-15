import { AuthOptions } from "next-auth"
import { OAuthConfig, OAuthProvider } from "next-auth/providers"


const RedditClientProvider:OAuthConfig<any> = {
    id: "redditclient",
    name: "RedditClient",
    type: "oauth",
    version: "2.0",
    accessTokenUrl: "https://www.reddit.com/api/v1/access_token",
    requestTokenUrl: "",
    profileUrl: "",
    async profile(profile, tokens) {
      // You can use the tokens, in case you want to fetch more profile information
      // For example several OAuth providers do not return email by default.
      // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.picture
      }
    },
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET
  }

export default RedditClientProvider