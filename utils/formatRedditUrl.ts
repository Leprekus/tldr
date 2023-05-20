export default function formatRedditUrl( url:string ) {
    return url.replace(/&amp;/g, '&')
}