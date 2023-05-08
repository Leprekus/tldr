## TL;DR

An app to save you time
**need to refactor reddit wrapper because methods should no longer pass URL, just auth**
## Tecnologies

- Next.js
- Typescript
- NextAuth
- Tailwindcss
- Zustand

## To-Do's

### Interactivity

- [ ] Add a four square icon to gallery view
- [ ] Allow user to sort gallery in 1 x 1 or 4 x 4
- [ ] Prefetch high res images on hover (gallery & image components)
- [ ] Cache the high res images

### About Component

- [ ] list subrredit links ex: nextjs has github & website, science has life, social, applied, etc
- [ ] allow users to subscribe to notifications
- [ ] allow to join / leave subreddit

### Settings

- [ ] add 'right hand mode' (flips action bar to right side)


### Notes
components using store:  Post, ActionBar, List, Comment
List Renders a Post component.
List checks if currentCommentId === post.id
List renders Comment if match

Card Sets currentCommentId if null
Card removes currentCommentId if it matches post.id

Card sets display alert to true if request fails
List renders Alert

Comment fetches data based on currentId value

Comment sets currentId to null (closes comment component)

I HAVE BEEN FIGHTING FOR 2 WEEKS. 2 WEEEKS WITHOUT GETTING THE AUTHENTICATION CORRECT. AND I JUST REALILZED IT'S BECAUSE I WAS PASSING THE NEXTAUTH OBJECT TO GETSERVERSESSION INSTEAD OF AUTHOPTIONS I JUST DID THAT AND MY WHOLE AUTH WORKS. OMGGGGGG I WASTED YEARS OF MY LIFE.
