import { IClientToken } from '@/typings';


export default async function authenticateClient() {

  // Define the URL for the access token endpoint
  const tokenUrl = 'https://www.reddit.com/api/v1/access_token';

  // Construct the basic authentication string
  const authString = `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`;

  // Encode the authentication string using base64 encoding
  const encodedAuthString = Buffer.from(authString).toString('base64');

  // Define the request options for the token endpoint
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedAuthString}`,
    },
    body: 'grant_type=client_credentials',
  };

  // Send a request to the token endpoint to retrieve the access token
  const response = await fetch(tokenUrl, options);
  const data: IClientToken = await response.json();

  // Return the access token from the response
  return data;
}