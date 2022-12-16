import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
import { fetchPosts, fetchUsers, fetchFavorites, fetchMessages, fetchProfiles } from "./data/provider.js"

const applicationElement = document.querySelector(".giffygram")

export const renderApp = () =>  { 
    const user = parseInt(localStorage.getItem("gg_user"))
    fetchUsers()
    .then(() => fetchPosts())
    .then(() => fetchFavorites())
    .then(() => fetchMessages())
    .then(() => fetchProfiles())
        .then(() => {
            if (user) {
                applicationElement.innerHTML = GiffyGram()
                
            } else {
                applicationElement.innerHTML = LoginForm()
            }
            
        })

}

renderApp()

applicationElement.addEventListener(
    "stateChanged",
    customEvent => {
        renderApp()
    }
)
