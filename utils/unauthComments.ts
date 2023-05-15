import { IRedditComment } from "@/typings"
import authenticateClient from "./authenticateClient"
import { REPL_MODE_STRICT } from "repl"

export default async function unauthComments (url: string) {
    const clientToken = await authenticateClient()
    fetch(url, {
        method: 'GET',
        headers : {
            authentication: 'Bearer ' + clientToken.access_token
        }
    }).then(res => res.json())
    .then(({ data }) => {
      console.log(data)
      const replies = data.children.map(({ data }: { data: IRedditComment }) => data)
      replies
    })
}