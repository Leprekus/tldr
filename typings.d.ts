export interface IClientToken {
  access_token: string;
  token_type: 'bearer';
  expires_in: 3600;
  scope: 'read write';
}

interface IMediaMetadata {
  [key: string]: {
    status: string;
  dashUrl: string;
  hlsUrl: string;
  fallbackUrl: string;
  height: number;
  width: number;
  e: string;
  gifUrl: string;
  mp4Url: string;
  processingStatus: string;
  scrubberMediaUrl: string;
  dashUrlFallback: string;
  duration: number;
  }
  
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
  likes: boolean;
  name: string;
  is_self: boolean;
  post_hint: 'link' | 'image' | 'video';
  media_metadata: MediaMetadata;
  is_reddit_media_domain: boolean;
  preview: {
    images: { resolutions: { url: string }[]}[]}
}

type RedditPostsResponse = RedditResponse<{
  data: {
    children: {
      kind: string;
      data: IRedditPost;
    }[];
  };
  after?: string | null;
  before?: string | null;
}>;

interface IWrapperSearchEndpoints {
  [key: string]: string | undefined;
  subreddits: string;
  user: string;
  query: string;
}

interface IAboutSubreddit {
  accept_followers: boolean;
  accounts_active: number;
  accounts_active_is_fuzzed: boolean;
  active_user_count: number;
  advertiser_category: string;
  all_original_content: boolean;
  allow_chat_post_creation: boolean;
  allow_discovery: boolean;
  allow_galleries: boolean;
  allow_images: boolean;
  allow_polls: boolean;
  allow_prediction_contributors: boolean;
  allow_predictions: boolean;
  allow_predictions_tournament: boolean;
  allow_talks: boolean;
  allow_videogifs: boolean;
  allow_videos: boolean;
  allowed_media_in_comments: any[];
  banner_background_color: string;
  banner_background_image: string;
  banner_img: string;
  banner_size: number[];
  can_assign_link_flair: boolean;
  can_assign_user_flair: boolean;
  collapse_deleted_comments: boolean;
  comment_contribution_settings: any;
  comment_score_hide_mins: number;
  community_icon: string;
  community_reviewed: boolean;
  created: number;
  created_utc: number;
  description: string;
  description_html: string;
  mobile_banner_image: string;
  user_is_subscriber: boolean;
  primary_color: string;
  title: string;
  subscribers: number;
  icon_img: string;
}

interface IRedditComment {
  id: string;
  author: string;
  body: string;
  score: number;
  created_utc: number;
  permalink: string;
  parent_id: string;
  subreddit: string;
  subreddit_id: string;
  subreddit_name_prefixed: string;
  likes: boolean | null;
  name: string;
}

interface IQuerySearch {
  [key: string]: string | undefined;
  subreddits?: string;
  user?: string;
  query?: string;
}

interface IInitialState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  comments: {
    
    currentCommentId: string | null;
  };
  setCurrentCommentId: (id: string) => void;
  removeCurrentCommentId: () => void;
  alert: {
    display: boolean;
    message: string;
    severity: "informational" | "warning" | "success" | "error" | undefined;
    setDisplay: (value: boolean) => void;
    setMessage: (message: string) => void;
    setSeverity: (value: "informational" | "warning" | "success" | "error" | undefined) => void
  }
  
}
