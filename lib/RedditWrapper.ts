import { IQuerySearch, IRedditPost, IWrapperSearchEndpoints, RedditPostsResponse } from '@/typings';

// Todos
// [ ] add sorting options to getfront page

type RedditAPIParams = {
    after?: string;         // Fullname of an item, used as an anchor point for pagination
    before?: string;        // Fullname of an item, used as an anchor point for pagination
    count?: number;         // The number of items already seen in the listing
    limit?: number;         // The maximum number of items to return in the listing
    show?: 'all' | 'given'  // Filter results based on which votes to include, either 'all' or 'given'
    sr_detail?: boolean;    // Include additional details about subreddits in the response
    sr_detail_type?: 'low' | 'high'; // Specify the amount of detail about subreddits to include
    raw_json?: boolean;     // Return the response in raw JSON format
    sort: 'hot' | 'new' | 'rising' | 'controversial' | 'top' | 'gilded' // Sort the results based on a given criterion
    t?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all'; // Time period to consider when sorting
  };
  
class RedditWrapper {
    private _baseUrl: string = 'https://oauth.reddit.com/';
    private _unauthUrl: string = 'https://www.reddit.com/';
    private _accessToken: string | null;
    private _GEToptions : RequestInit; 
    
    constructor(accessToken?: string) {
        this._accessToken = accessToken || null
        this._GEToptions = { 
            method: 'GET',
            headers: {
              authorization: 'Bearer ' + this._accessToken
            },
          };
        
    }
    private async fetchData(url: string, endpoint: string, params: object | {} = { sort: 'hot'}) {
        //dom seomthing
        
        const searchParams = new URLSearchParams({
            ...params
        }) 
        //const URL = url + endpoint + searchParams 
        
        //const options = url === this._baseUrl ? this._GEToptions : {}

        const URL = (this._accessToken ? this._baseUrl : this._unauthUrl) + endpoint + searchParams
        const options = this._accessToken ? this._GEToptions : {}
        console.log(this._GEToptions)
        console.log({ URL })
        const response = await fetch(URL, options)

        if(response.ok) {
            const json = await response.json()
            const posts = json.data.children.map(({ data }: { data: IRedditPost}) => data)
            return posts
        }
        
        throw response.statusText
    }

    private getUrl() {
        return this._accessToken ? this._baseUrl : this._unauthUrl
    }
    private getOptions() {
        return this._accessToken ? this._GEToptions : undefined
    }

    getAccessToken() {
        if(!this._accessToken) throw Error('no token provided')
        return this._accessToken
    }
    setAccessToken(newAccessToken: string) {
        this._accessToken = newAccessToken
        this._GEToptions = {
            ...this._GEToptions,
            headers: {
                authorization: 'Bearer ' + this._accessToken
              },
        }
    }

    async getFrontPage (params : RedditAPIParams = { sort: 'hot' }) {
        
        const endpoint = '.json?'
        const data = await this.fetchData(this._unauthUrl, endpoint, params)
        return data

    }
    async getUserFrontPage (params : RedditAPIParams = { sort: 'hot' }) {
    
        const endpoint = '.json?' 
        const data = await this.fetchData(this._baseUrl, endpoint, params)
        return data


    }

    //getMyProperty returns a value
    async getUpvoted (name: string) {

        const endpoint = 'user/' + name + '/upvoted'
        const data = await this.fetchData(this._baseUrl, endpoint, {})
        return data
        

    }
    async getDownvoted (name: string) {
        const endpoint = 'user/' + name + '/downvoted'
        const data = await this.fetchData(this._baseUrl, endpoint, {})
        return data

    }
    async search (search: IQuerySearch) {
        const key = Object.keys(search)[0]
        const query: any = search[key]

        const endpoints: IWrapperSearchEndpoints = {
            subreddits: 'subreddits/search.json?q=' + query,
            user: 'user/' + query + '/.json',
            query: 'search.json?q=' + query
        }

        const endpoint = endpoints[key]

        const data = await this.fetchData(this._unauthUrl, endpoint!, {})
        return data 

    }
    async getSubreddit (params: {subreddit: string, auth: boolean }) {
        const { subreddit, auth } = params
        
        const url = auth ? this._baseUrl : this._unauthUrl
        const endpoint = 'r/' + subreddit
        const data = await this.fetchData(url, endpoint, {})
        return data
    }
    async getSubredditAbout (params: {subreddit: string, auth: boolean }) {
        const { subreddit, auth } = params
        //https://www.reddit.com/r/{subreddit_name}/about.json
        const url = auth ? this._baseUrl : this._unauthUrl
        const endpoint = 'r/' + subreddit + '/about.json'
        const options = auth ? this._GEToptions : {}
        const res = await fetch(url + endpoint, options)
        const json = await res.json()
        return json.data
        
    }
    async getUserAbout (params: {user: string, auth: boolean }) {
        const { user, auth } = params
        //https://www.reddit.com/r/{subreddit_name}/about.json
        const url = auth ? this._baseUrl : this._unauthUrl
        const endpoint = 'user/' + user + '/about.json'
        const options = auth ? this._GEToptions : {}
        console.log({ urlEndpoint: url + endpoint, options })
        const res = await fetch(url + endpoint, options)
        const json = await res.json()
        console.log({ json })
        //return json.data
        
    }
    async getComments(params: { subreddit: string, id: string }) {
        const endpoint = this.getUrl() + '/r/'+ params.subreddit + '/comments/' + params.id + '.json'
        const res = await fetch(endpoint, this.getOptions())
        
        if(res.ok) {
            const data = await res.json()
            return this.parseData(data[1])
        }
        console.log(res.statusText)
    }
    //will replace fetchData
    private parseData(json:RedditPostsResponse) {
    
        return json.data.children.map(({ data }: { data: IRedditPost}) => data)
  
    }
}

export default RedditWrapper