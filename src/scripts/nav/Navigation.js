import { LoginForm } from "../auth/Login.js"
import { postList } from "../feed/PostList.js"
import { Profile } from "../friends/Profile.js"
import { GiffyGram } from "../GiffyGram.js"
import { createDirectMessage } from "../message/MessageForm.js"
import { getCurrentUser } from "../data/provider.js";
import { displayMessagesPage } from "../friends/DirectMessage.js"


export const Navigation = () => {
    const currentUser = getCurrentUser();
    let userName = currentUser.name;
    return `
        <nav class="navigation">
            <div class="navigation__item navigation__icon">
                <img src="/images/pb.png" alt="Giffygram icon" id="logo">
            </div>
            <div class="navigation__item navigation__name">
                Giffygram 
            </div>
            <div class="navigation__item navigation__name">Welcome! ${userName}</div>
            <div class="navigation__item navigation__search"> </div>
            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="/images/fountain-pen.svg" alt="Direct message">
                <div class="notification__count" id="notificationIcon"> 0 </div>
            </div>
            <div class="navigation__item navigation__profile">
            <button id="profile">Profile</button>
            </div>
            <div class="navigation__item navigation__logout">
                <button id="logout">Logout</button>
            </div>
       </nav> `
}

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", clickEvent => {
        if(clickEvent.target.id === "logout") {
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
applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "notificationIcon") {
       document.querySelector(".giffygram__feed").innerHTML = displayMessagesPage()
     
    }
}
)
