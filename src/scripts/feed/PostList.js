import { postEntryForm, editPostForm } from "./PostEntry.js";
import {
  getUsers,
  getPosts,
  getChosenTimespan,
  getCurrentUser,
  getDisplayFavorites,
  getFavorites,
  sendFavorites,
  deleteFavorite,
  dateDisplayed,
  deletePost,
  getChosenUser,
  setDisplayPostCount,
  getProfiles,
} from "../data/provider.js";
import { Profile } from "../friends/Profile.js";

const applicationElement = document.querySelector(".giffygram");
const todaysDate = new Date().toDateString();
export const postList = () => {
  const newPost = getPosts();
  newPost.reverse();

  // Filtering by Timespan
  let chosenTimespan = parseInt(getChosenTimespan());
  const filterByTimespan = (currentTimespan) => {
    let currentHour = new Date().getHours() + 6;
    if (currentHour < 10) {
      currentHour = "0" + currentHour.toString();
    } else {
      currentHour = currentHour.toString();
    }
    let filtered = newPost;
    if (currentTimespan === 0) {
      filtered = newPost;
    }
    // By Hour
    else if (currentTimespan === 1) {
      filtered = newPost.filter((post) => {
        let dateStr = timespanStr(post.date);
        return (
          dateStr.substr(12, 4) === new Date().getFullYear().toString() &&
          dateStr.substr(8, 3) ===
            new Date().toLocaleString("en-US", { month: "short" }) &&
          dateStr.substr(0, 3) ===
            new Date().toLocaleString("en-US", { weekday: "short" }) &&
          dateStr.substr(17, 2) === currentHour
        );
      });
    }
    // By Day
    else if (currentTimespan === 2) {
      filtered = newPost.filter((post) => {
        let dateStr = timespanStr(post.date);
        return (
          dateStr.substr(12, 4) === new Date().getFullYear().toString() &&
          dateStr.substr(8, 3) ===
            new Date().toLocaleString("en-US", { month: "short" }) &&
          dateStr.substr(0, 3) ===
            new Date().toLocaleString("en-US", { weekday: "short" })
        );
      });
    }
    // By Month
    else if (currentTimespan === 3) {
      filtered = newPost.filter((post) => {
        let dateStr = timespanStr(post.date);
        return (
          dateStr.substr(12, 4) === new Date().getFullYear().toString() &&
          dateStr.substr(8, 3) ===
            new Date().toLocaleString("en-US", { month: "short" })
        );
      });
    }
    // By Year
    else if (currentTimespan === 4) {
      filtered = newPost.filter((post) => {
        let dateStr = timespanStr(post.date);
        return dateStr.substr(12, 4) === new Date().getFullYear().toString();
      });
    }
    return filtered;
  };

  let filteredPosts = filterByTimespan(chosenTimespan);

  let chosenUser = parseInt(getChosenUser());
  const filterByUsers = (currentChosenUser) => {
    let filtered = filteredPosts;
    if (currentChosenUser === 0) {
      return (filtered = filteredPosts);
    } else {
      return (filtered = filteredPosts.filter((post) => {
        return post.userId === currentChosenUser;
      }));
    }
  };

  filteredPosts = filterByUsers(chosenUser);

  if (getDisplayFavorites()) {
    filteredPosts = favoritesFilter(filteredPosts, getCurrentUser().id);
  }

  let html = `
  <div id="edit_PostForm" class="message__overlay"></div>
  ${postEntryForm()}`;

  filteredPosts.map((post) => {
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
                <div>
                    <img class="post__image" src="${post.postURL}">
                </div>

                <div class="post__description">
                    ${post.postDescription}
                </div>

                <div class="post__tagline">
                    posted by <a id="profiles--${foundUser.id}" href="">${
      foundUser.name
    }</a> on ${dateDisplayed(post)}
                </div>

                <div class="post__actions">
                    <img class="clickable" id="favoritePost--${
                      post.id
                    }" src="images/favorite-star-${starColor}.svg" height="25" width="25">`;
    if (post.userId === currentUser.id) {
      html += `<img class="clickable" id="blockPost--${post.id}" src="images/block.svg" height="25" width="25">
          <img class="clickable" id="editPost--${post.id}" src="images/edit.svg" height="25" width="25">
          `;
    }

    html += `</div>
        </section>`;
  });

  setDisplayPostCount(filteredPosts.length);

  return html;
};

document.addEventListener("click", (event) => {
  if (event.target.id.startsWith("editPost")) {
    let [, postId] = event.target.id.split("--");
    postId = parseInt(postId);
    document.getElementById('edit_PostForm').innerHTML = editPostForm(postId)
    document.getElementById('edit_PostForm').style.border = "3px solid black"
  }
});

document.addEventListener("click", (event) => {
  if (event.target.id.startsWith("profiles")) {
    let [, profileUserId] = event.target.id.split("--");
    let userObj = getUsers().find((user) => {
      return user.id === parseInt(profileUserId);
    });
    applicationElement.innerHTML = Profile(userObj);
  }
});

document.addEventListener("click", (event) => {
  if (event.target.id.startsWith("favoritePost")) {
    if (!getCurrentUser().id) {
      window.alert("Log in to like posts!");
    } else {
      let [, postId] = event.target.id.split("--");
      postId = parseInt(postId);
      let currentUser = getCurrentUser();
      const favoriteObj = findFavoriteObj(postId, currentUser.id);
      if (favoriteObj) {
        deleteFavorite(favoriteObj.id);
      } else {
        let favoriteInfo = {
          postId: postId,
          userId: currentUser.id,
        };
        sendFavorites(favoriteInfo);
      }
    }
  }
});

document.addEventListener("click", (event) => {
  if (event.target.id.startsWith("blockPost")) {
    let [, postId] = event.target.id.split("--");
    postId = parseInt(postId);
    deletePost(postId);
  }
});

const timespanStr = (postDate) => {
  let event = new Date(postDate);
  return event.toUTCString();
};

function findFavoriteObj(postId, userId) {
  const favorites = getFavorites();
  const foundFavorite = favorites.find((favorite) => {
    return favorite.postId === postId && favorite.userId === userId;
  });
  return foundFavorite;
}

function favoritesFilter(postsArray, userId) {
  const favorites = getFavorites();
  return postsArray.filter((post) => {
    return favorites.find((favorite) => {
      return favorite.postId === post.id && favorite.userId === userId;
    });
  });
}
