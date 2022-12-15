const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector(".giffygram");

const applicationState = {
  currentUser: {},
  feed: {
    chosenUser: null,
    displayFavorites: false,
    displayMessages: false,
    displayPostEntry: true,
  },
  posts: [],
  favorites: []
};

export const fetchUsers = () => {
  return fetch(`${apiURL}/users`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.users = data;
    });
};

export const fetchPosts = () => {
  return fetch(`${apiURL}/posts`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.posts = data;
    });
};

export const fetchFavorites = () => {
  return fetch(`${apiURL}/favorites`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.favorites = data;
    });
};

export const getPostEntryStatus = () => {
  return applicationState.feed.displayPostEntry;
};

export const getUsers = () => {
  return applicationState.users.map((user) => ({ ...user }));
};

export const getPosts = () => {
  return applicationState.posts.map((p) => ({ ...p }));
};

export const getFavorites = () => {
  return applicationState.favorites.map((f) => ({ ...f }));
};

export const getCurrentUser = () => {
  return { ...applicationState.currentUser };
};

export const setPostEntryStatus = (input) => {
  applicationState.feed.displayPostEntry = input;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setCurrentUser = (inputUser) => {
  applicationState.currentUser = inputUser;
};

export const sendPostEntry = (postObj) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),
  };

  return fetch(`${apiURL}/posts`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const sendFavorites = (favObj) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favObj),
  };

  return fetch(`${apiURL}/favorites`, fetchOptions)
    .then((response) => response.json())
    .then(() => {});
};
