const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector(".giffygram");


const applicationState = {
  currentUser: {},
  feed: {
    chosenTimespan: 0,
    chosenUser: 0,
    displayFavorites: false,
    displayMessages: false,
    displayPostEntry: false,
    displayPostCount: null
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

export const fetchProfiles = () => {
  return fetch(`${apiURL}/profiles`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.profiles = data;
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

export const getDisplayPostCount = () => {
  return applicationState.feed.displayPostCount;
}

export const getChosenUser = () => {
  return applicationState.feed.chosenUser;
}

export const getDisplayFavorites = () => {
  return applicationState.feed.displayFavorites;
};

export const getProfiles = () => {
  return applicationState.profiles.map((p) => ({ ...p }));
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

export const setDisplayPostCount = (inputCount) => {
  applicationState.feed.displayPostCount = inputCount
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

export const sendUsers = (userObj) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  };

  return fetch(`${apiURL}/users`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};


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
      body: JSON.stringify(messageObj)
  }

  return fetch(`${apiURL}/messages`, fetchOptions)
      .then(response => response.json())
      .then(() => {
          applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
      })
}

export const deleteFavorite = (favoriteId) => {
  return fetch(`${apiURL}/favorites/${favoriteId}`, { method: "DELETE" })
  .then(() => {
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  })
}

export const deletePost = (postId) => {
  return fetch(`${apiURL}/posts/${postId}`, { method: "DELETE" })
  .then(() => {
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
  })
}

export const dateDisplayed = (post) =>{
  let event = post.date
  const options = {year: 'numeric', month: 'short', day: 'numeric' };

  event = new Date(event)
  return event.toLocaleDateString('us-EG', options)
}

export const updateProfile = (profileObj) => {
  const fetchOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(profileObj)
  }

  return fetch(`${apiURL}/profiles`, fetchOptions)
      .then(response => response.json())
      .then(() => {
          applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
      })
}

export const updatePost = (postObj, postId) => {
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj)
  };

  return fetch(`${apiURL}/posts/${postId}`, fetchOptions)
  .then((response) => response.json())
  .then(() => {
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
  })
}














export const updateMessages = (msgObj, msgId) => {
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msgObj)
  };

  return fetch(`${apiURL}/messages/${msgId}`, fetchOptions)
  .then((response) => response.json())
  .then(() => {
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
  })
}
