import { getPosts, getUsers, getDisplaySinceYear } from "../data/provider.js"
import { postEntryForm } from "./PostEntry.js"


// "posts":
//       "postTitle": "Life at NSS",
//       "postURL": "https://i.giphy.com/media/cklPOHnHepdwBLRnQp/200.webp",
//       "postDescription": "#blessed",
//       "userId": 1,
//       "id": 1


//gif title
//gif
//description
//posted by NAME on DATE
//favorite star + trashcan
const todaysDate = new Date().toDateString()
export const postList = () =>{
    const newPost = getPosts()
    const displayYear = getDisplaySinceYear();
    filteredPosts = newPost.filter(post => post.date <= displayYear)
    let html = `${postEntryForm()}`
    filteredPosts.map(post =>{
        const users = getUsers()
        let foundUser = users.find(user =>{
                if(parseInt(post.userId)===parseInt(user.id)){
                    return user
                }
            })
        html += `
                <section class="post" id="${post.id}">
                    <h2 class="post__title">${post.postTitle}</h2>
                        <div class="post__image">
                            <img src="${post.postURL}">
                        </div>
    
                        <div class="post__description">
                            ${post.postDescription}
                        </div>
    
                        <div class="post__tagline">
                            posted by ${foundUser.name} on ${post.date}
                        </div>
    
                        <div class="post__actions">
                            <img id="favoritePost" src="https://spng.pngfind.com/pngs/s/2-20080_28-collection-of-mario-star-clipart-super-mario.png" height="25" width="25">
                            <img id="blockPost" src="https://toppng.com/uploads/preview/trash-can-11530995314kgh8pawz8u.png" height="25" width="25">
                    </div>
                </section>`
    })
    return html
}