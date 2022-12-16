
const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector(".giffygram");

const applicationState = {
  currentUser: {
    id: 1,
    name: "Daniella Agnoletti",
    email: "daniella@agnoletti.com",
    password: "daniella"
  },
  feed: {
    chosenUser: null,
    displayFavorites: false,
    displayMessages: false,
    displayPostEntry: true,
    displaySinceYear: parseInt(new Date().getFullYear())
  },
  posts:[],
  users:[],
  messages:[],
  favorites: [],
  profiles: []
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

export const getDisplaySinceYear = () => {
  return applicationState.feed.displaySinceYear;
}

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

export const getMessages = () => {
  return applicationState.messages.map((p) => ({ ...p }));
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
  applicationState.currentUser = inputUser
}

export const setDisplaySinceYear = (inputYear) => {
  applicationState.feed.displaySinceYear = inputYear
}

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

export const sendUsers = (userServiceRequest) => {
  const fetchOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userServiceRequest)
  }


  return fetch(`${apiURL}/users`, fetchOptions)
      .then(response => response.json())
      .then(() => {
          mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
      })
}

export const sendMessages = (userServiceRequest) => {
  const fetchOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userServiceRequest)
  }


  return fetch(`${apiURL}/messages`, fetchOptions)
      .then(response => response.json())
      .then(() => {
          mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
      })
}

export const dateDisplayed = (post) =>{
  let event = post.date
  const options = {year: 'numeric', month: 'short', day: 'numeric' };

  event = new Date(event)
  return event.toLocaleDateString('us-EG', options)

}

export const fetchProfiles = () => {
  return fetch(`${apiURL}/profiles`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.users = data;
    });
};

export const getProfiles = () => {
  return applicationState.profiles.map((p) => ({ ...p }));
};

export const updateProfile = (userServiceRequest) => {
  const fetchOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userServiceRequest)
  }


  return fetch(`${apiURL}/profiles`, fetchOptions)
      .then(response => response.json())
      .then(() => {
          mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
      })
}