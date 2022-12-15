import { postEntryForm } from "./PostEntry.js"
import { getUsers, getPosts, sendFavorites } from "../data/provider.js"

//gif title
//gif
//description
//posted by NAME on DATE
//favorite star + trashcan
const todaysDate = new Date().toDateString()
export const postList = () =>{
    let html = 
    `<div class="giffygram__feed">
        ${postEntryForm()}
        <section class="post" id="1">
            <h2 class="post__title">boo!</h2>
                <div class="post__image">
                    <img id="1" src="https://i.giphy.com/media/3o6ZtrtQMscwc87A6Q/giphy.gif">
                </div>

                <div class="post__description">
                    cute ghost doggo :)
                </div>

                <div class="post__tagline">
                    posted by kaci on ${todaysDate}
                </div>

                <div class="post__actions">
                    <img id="favoritePost--1" src="https://spng.pngfind.com/pngs/s/2-20080_28-collection-of-mario-star-clipart-super-mario.png" height="25" width="25">
                    <img id="blockPost" src="https://toppng.com/uploads/preview/trash-can-11530995314kgh8pawz8u.png" height="25" width="25">
                </div>
        </section>
    </div>`
    return html
}

document.addEventListener("click", (event) => {
    if (event.target.id.startsWith("favoritePost")) {
        let [,postId] = event.target.id.split("--")
        postId = parseInt(postId)
        let posts = getPosts();
        let foundPost = posts.find((post) => {
            return post.id === postId
        })
        let users = getUsers();
        let foundUser = users.find((user) => {
            return user.id === foundPost.userId
        })

        let favoriteInfo = {
            postId: postId,
            userId: foundUser.id
        }
        
        sendFavorites(favoriteInfo)

    }
})