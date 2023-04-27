import { IRedditPost, RedditPostsResponse } from '@/typings';

// Todos
// [ ] add sorting options to getfront page
class RedditWrapper {
    private _baseUrl: string = 'https://oauth.reddit.com/';
    private _unauthUrl: string = 'https://www.reddit.com/';
    private _accessToken: string | null;
    private _GEToptions : RequestInit; 
    
    constructor(accessToken: string) {
        this._accessToken = accessToken || null
        this._GEToptions = { 
            method: 'GET',
            headers: {
              authorization: 'Bearer ' + this._accessToken
            },
          };
        
    }
    private async parsePosts(data: RedditPostsResponse) {
        //dom seomthing
        const json = await data.json()
        const posts = json.data.children.map(({ data }: { data: IRedditPost}) => data)
        return posts
    }

    getAccessToken() {
        if(!this._accessToken) throw Error('no token provided')
        return this._accessToken
    }
    setAccessToken(newAccessToken: string) {
        this._accessToken = newAccessToken
    }

    async getFrontPage (params : {sort: 'new'} = { sort: 'new' }) {
        const searchParams = new URLSearchParams({
            ...params
        })
        const response = await fetch(this._unauthUrl + '.json?' + searchParams)
        .catch(error => { throw Error(error) })
        const data = await this.parsePosts(response)
        return data


    }
    async getUserFrontPage (params : {sort: 'new'} = { sort: 'new' }) {
        const searchParams = new URLSearchParams({
            ...params
        })
        const response = await fetch(this._baseUrl + '.json?' + searchParams, this._GEToptions)
        .catch(error => { throw Error(error) })
        const data = await this.parsePosts(response)
        return data


    }

    //getMyProperty returns a value
    async getUpvoted (name: string, params : {sort: 'new'} = { sort: 'new' }) {

        const searchParams = new URLSearchParams({
            ...params
        })
        const response = await fetch(this._baseUrl + 'user/'+ name + '/upvoted?' + searchParams, this._GEToptions)
        .catch(error => { throw Error(error) })
        const data = await this.parsePosts(response)
        return data
        

    }
    async getDownvoted (name: string) {

        const response = await fetch(this._baseUrl + 'user/'+ name + '/downvoted', this._GEToptions)
        .catch(error => { throw Error(error) })
        const data = await this.parsePosts(response)
        return data
        

    }
}

export default RedditWrapper