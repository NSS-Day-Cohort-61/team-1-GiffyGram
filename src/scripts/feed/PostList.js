import { postEntryForm } from "./PostEntry.js";
import {
  getUsers,
  getPosts,
  sendFavorites,
  getDisplayFavorites,
  getFavorites,
  getDisplaySinceYear,
  getCurrentUser,
  deleteFavorite
} from "../data/provider.js";

const todaysDate = new Date().toDateString();
export const postList = () => {
  let posts = getPosts();
  posts.reverse();
  const displayYear = getDisplaySinceYear();
  const filteredPosts = posts.filter(
    (post) => post.date.substr(0, 4) <= displayYear
  );
  if (getDisplayFavorites()) {
    posts = favoritesFilter(posts);
  }

  let html = `${postEntryForm()}`;
  posts.map((post) => {
    const favorites = getFavorites();
    const currentUser = getCurrentUser();
    const foundFavorite = favorites.find((favorite) => {
      return favorite.postId === post.id && favorite.userId === currentUser.id;
    });
    const isFavorited = foundFavorite ? true : false;
    const starColor = isFavorited ? "yellow" : "blank";

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
                <img id="favoritePost--${post.id}" src="images/favorite-star-${starColor}.svg" height="25" width="25">
                <img id="blockPost" src="images/block.svg" height="25" width="25">
            </div>
        </section>`;
  });
  return html;
};

document.addEventListener("click", (event) => {
  if (event.target.id.startsWith("favoritePost")) {
    let [, postId] = event.target.id.split("--");
    postId = parseInt(postId);
    // let posts = getPosts();
    // let foundPost = posts.find((post) => {
    //   return post.id === postId;
    // });
    let currentUser = getCurrentUser();
    // let users = getUsers();
    // let foundUser = users.find((user) => {
    //   return user.id === foundPost.userId;
    // });
    const favoriteObj = findFavoriteObj(postId, currentUser.id);
    if (favoriteObj) {
      deleteFavorite(favoriteObj.id)
    } else {
      let favoriteInfo = {
        postId: postId,
        userId: currentUser.id,
      };
      sendFavorites(favoriteInfo);
    }
  }
});

function findFavoriteObj(postId, userId) {
  const favorites = getFavorites();
  const foundFavorite = favorites.find((favorite) => {
    return favorite.postId === postId && favorite.userId === userId;
  });
  return foundFavorite
}

function favoritesFilter(postsArray) {
  const favorites = getFavorites();
  return postsArray.filter((post) => {
    return favorites.find((favorite) => {
      return favorite.postId === post.id;
    });
  });
}
