import { LoginForm } from "../auth/Login.js"
import { postList } from "../feed/PostList.js"
import { Profile } from "../friends/Profile.js"
import { GiffyGram } from "../GiffyGram.js"
import { createDirectMessage } from "../message/MessageForm.js"
import { getCurrentUser, setCurrentUser } from "../data/provider.js";


export const Navigation = () => {
    const currentUser = getCurrentUser();
    let userName;
    if(currentUser.name) {
        userName = currentUser.name;
    }
    let html = `
        <nav class="navigation">
            <div class="navigation__item navigation__icon">
                <img src="/images/pb.png" alt="Giffygram icon" id="logo">
            </div>
            <div class="navigation__item navigation__name">
                Giffygram 
            </div>`
            if (userName) {
                html += `<div class="navigation__item navigation__name">Welcome, ${userName}!</div>`
            } else {
                html += `<div class="navigation__item navigation__name">Welcome!</div>`
            }
            html +=`
            <div class="navigation__item navigation__search"> </div>
            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="/images/fountain-pen.svg" alt="Direct message">
                <div class="notification__count"> 0 </div>
            </div>
            <div class="navigation__item navigation__profile">
            <button id="profile">Profile</button>
            </div>`
            if (!Object.keys(currentUser).length) {
            html += 
            `<div class="navigation__item navigation__logout">
                <button id="logout">Log in</button>
            </div>`
            } else {
                html += 
                `<div class="navigation__item navigation__logout">
                    <button id="logout">Logout</button>
                </div>`
            }
            html += `</nav> `
       return html
}

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", clickEvent => {
        if(clickEvent.target.id === "logout") {
            localStorage.setItem("gg_user", 0)
            setCurrentUser({})
            applicationElement.innerHTML = LoginForm()
        }
    }
)
applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "profile") {
        applicationElement.innerHTML = Profile()
    }
}
)
applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "logo") {
        applicationElement.innerHTML = GiffyGram()
    }
}
)
applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "directMessageIcon") {
        document.querySelector("#message__form__popup").innerHTML = createDirectMessage()
        // document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
}
)