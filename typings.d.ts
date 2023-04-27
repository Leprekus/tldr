export interface IClientToken {
    access_token: string,
    token_type: "bearer",
    expires_in: 3600,
    scope: "read write"
  }

  interface IRedditPost {
    title: string;
    author: string;
    subreddit: string;
    permalink: string;
    url: string;
    score: number;
    created_utc: number;
    num_comments: number;
    thumbnail?: string;
    selftext?: string;
    upvote_ratio: number;
    ups: number;
    downs: number;
    created: number;
    subreddit_name_prefixed: string;
    id: string;
    likes: number;
  }
  

  type RedditPostsResponse = RedditResponse<{
    data: {
      children: {
        kind: string;
        data: IRedditPost;
      }[];
    }
    after?: string | null;
    before?: string | null;
  }>;