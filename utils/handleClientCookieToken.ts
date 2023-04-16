//check if there is client token
//if client exists return 
//if client not exists create
//if client is about to expire refetch

import { NextRequest } from 'next/server';
import retrieveJWT from './retrieveJWT';
import authenticateClient from './authenticateClient';
import storeJWT from './storeJWT';

export default async function handleClientCookieToken(req: NextRequest, headers: Headers) {
    
    const retrieveToken = retrieveJWT(req)
    
    if(!retrieveToken) {
       
        const clientToken = await authenticateClient()
        
        storeJWT(headers, clientToken)

        return clientToken.access_token

    }

    return retrieveToken
}