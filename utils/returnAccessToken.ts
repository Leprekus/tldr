import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import authenticateClient from "./authenticateClient"

export default async function returnAccessToken () {

    const session = await getServerSession(authOptions)
    
    const token = session?.accessToken ? session.accessToken : (await authenticateClient()).access_token

    return token

}