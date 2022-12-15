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
  users:[],
  posts:[],
  messages:[]
};

export const fetchUsers = () => {
  return fetch(`${apiURL}/users`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.users = data;
    });
};
export const fetchMessages = () => {
  return fetch(`${apiURL}/messages`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.messages = data;
    });
};
export const fetchPosts = () => {
  return fetch(`${apiURL}/posts`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.posts = data;
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
export const getMessages = () => {
  return applicationState.messages.map((p) => ({ ...p }));
};

export const getCurrentUser = () => {
  return {...applicationState.currentUser}
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
