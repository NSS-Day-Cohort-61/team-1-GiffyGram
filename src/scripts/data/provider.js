const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector(".giffygram");


const applicationState = {
  currentUser: {},
  feed: {
    chosenTimespan: 0,
    chosenUser: null,
    displayFavorites: false,
    displayMessages: false,
    displayPostEntry: false,
  },
  users: [],
  posts: [],
  favorites: [],
  messages: [],
  timespans: [],
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

export const fetchFavorites = () => {
  return fetch(`${apiURL}/favorites`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.favorites = data;
    });
};

export const fetchTimespans = () => {
  return fetch(`${apiURL}/timespans`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.timespans = data;
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

export const getTimespans = () => {
  return applicationState.timespans.map((t) => ({ ...t }));
};

export const getCurrentUser = () => {
  return { ...applicationState.currentUser };
};

export const getChosenTimespan = () => {
  return applicationState.feed.chosenTimespan;
}

export const getChosenUser = () => {
  return { ...applicationState.feed.chosenUser };
}

export const getDisplayFavorites = () => {
  return applicationState.feed.displayFavorites;
};

export const setPostEntryStatus = (input) => {
  applicationState.feed.displayPostEntry = input;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setCurrentUser = (inputUser) => {
  applicationState.currentUser = inputUser
}

export const setChosenUser = (inputUser) => {
  applicationState.feed.chosenUser = inputUser
}

export const setChosenTimespan = (inputTimespan) => {
  applicationState.feed.chosenTimespan = inputTimespan
}

export const setDisplayFavorites = (input) => {
  applicationState.feed.displayFavorites = input;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
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
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const sendUsers = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userServiceRequest),
  };

  return fetch(`${apiURL}/users`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const deleteFavorite = (favoriteId) => {
  return fetch(`${apiURL}/favorites/${favoriteId}`, { method: "DELETE" })
  .then(() => {
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  })
}

export const deleteMessage = (messageId) => {
  return fetch(`${apiURL}/messages/${messageId}`, { method: "DELETE" })
  .then(() => {
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
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
      applicationState.profiles = data;
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