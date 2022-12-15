import { postEntryForm } from "./PostEntry.js";
import { getUsers, getPosts, sendFavorites, getDisplayFavorites, getFavorites } from "../data/provider.js";

const todaysDate = new Date().toDateString();
export const postList = () => {
  let posts = getPosts();
  posts.reverse();
  let html = `${postEntryForm()}`;
  if (getDisplayFavorites()){
    posts = favoritesFilter(posts)
  }
  posts.map((post) => {
    const users = getUsers();
    let foundUser = users.find((user) => {
      if (post.userId === user.id) {
        return user;
      }
    });
    html += `
        <section class="post" id="${post.id}">
            <h2 class="post__title">${post.postTitle}</h2>
            <img class="post__image" src="${post.postURL}">
            <div class="post__description">
                ${post.postDescription}
            </div>
            <div class="post__tagline">
                posted by ${foundUser.name} on ${post.date}
            </div>
            <div class="post__actions">
                <img id="favoritePost--${post.id}" src="https://spng.pngfind.com/pngs/s/2-20080_28-collection-of-mario-star-clipart-super-mario.png" height="25" width="25">
                <img id="blockPost" src="https://toppng.com/uploads/preview/trash-can-11530995314kgh8pawz8u.png" height="25" width="25">
            </div>
        </section>`;
  });
  return html;
};

document.addEventListener("click", (event) => {
  if (event.target.id.startsWith("favoritePost")) {
    let [, postId] = event.target.id.split("--");
    postId = parseInt(postId);
    let posts = getPosts();
    let foundPost = posts.find((post) => {
      return post.id === postId;
    });
    let users = getUsers();
    let foundUser = users.find((user) => {
      return user.id === foundPost.userId;
    });
    let favoriteInfo = {
      postId: postId,
      userId: foundUser.id,
    };
    sendFavorites(favoriteInfo);
  }
});


function favoritesFilter(postsArray) {
    const favorites = getFavorites();
    return postsArray.filter((post) => {
        return favorites.find((favorite) => {
            return favorite.postId === post.id
        })
    })
}