import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user: User;
    error: string;
  }
  interface User {
    access_token?: string;
    expires_in?: number;

  }
}