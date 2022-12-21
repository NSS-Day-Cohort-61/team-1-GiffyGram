import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
import { fetchPosts, fetchUsers, fetchFavorites, fetchMessages, fetchProfiles, fetchTimespans, getUsers, setCurrentUser } from "./data/provider.js"

const applicationElement = document.querySelector(".giffygram")

export const renderApp = () =>  { 
    const user = parseInt(localStorage.getItem("gg_user"))
    fetchUsers()
    .then(() => fetchPosts())
    .then(() => fetchFavorites())
    .then(() => fetchTimespans())
    .then(() => fetchMessages())
    .then(() => fetchProfiles())
        .then(() => {
            let currentUser = getUsers().find((user) => user.id === parseInt(localStorage.getItem("gg_user"))) || {}; 
            setCurrentUser(currentUser)
            applicationElement.innerHTML = GiffyGram()
        })

}

renderApp()

applicationElement.addEventListener(
    "stateChanged",
    customEvent => {
        renderApp()
    }
)
