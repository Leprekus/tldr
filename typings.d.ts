interface IError {
  error: number;
  message: string
}
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
  is_video: boolean;
  author_flair_type: string;
  secure_media: {
    reddit_video: {
      dash_url: string;
      fallback_url: string;
    }
  }
  url_overridden_by_dest: string;
  title : string;
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
    images: { resolutions: { url: string }[]}[]
  }
  all_awardings: {
    length: number;
    "giver_coin_reward": null,
    "subreddit_id": null,
    "is_new": boolean,
    "days_of_drip_extension": null,
    "coin_price": number,
    "id": "gid_1",
    "penny_donate": null,
    "award_sub_type": "GLOBAL",
    "coin_reward": number,
    "icon_url": "https://www.redditstatic.com/gold/awards/icon/silver_512.png",
    "days_of_premium": null,
    "tiers_by_required_awardings": null,
    "resized_icons": 
        {
            "url": "https://www.redditstatic.com/gold/awards/icon/silver_16.png",
            "width": number,
            "height": number
        }[],
    "icon_width": number,
    "static_icon_width": number,
    "start_date": null,
    "is_enabled": true,
    "awardings_required_to_grant_benefits": null,
    "description": "Shows the Silver Award... and that's it.",
    "end_date": null,
    "sticky_duration_seconds": null,
    "subreddit_coin_reward": number,
    "count": number,
    "static_icon_height": number,
    "name": "Silver",
    "icon_format": null,
    "icon_height": number,
    "penny_price": null,
    "award_type": "global",
    "static_icon_url": "https://www.redditstatic.com/gold/awards/icon/silver_512.png"
}
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
  public_description: string;
  display_name_prefixed: string;
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
  link_id: string;
  name: string;
  replies: {
    data: {
      children: [
        { data: IRedditComment | children },
        { data: {
            children: string[]
          }
         }
      ]
    }
  }
  kind: 't1';
}

interface IQuerySearch {
  [key: string]: string | undefined;
  subreddits?: string;
  user?: string;
  query?: string;
}

interface IRedditUser {
  id: string;
  name: string;
  icon_img: string;
  created_utc: number;
  link_karma: number;
  comment_karma: number;
  is_gold: boolean;
  is_mod: boolean;
  verified: boolean;
  total_karma: number;
  description: string;
  subreddit: {
    id: string;
    name: string;
    display_name: string;
  };
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
