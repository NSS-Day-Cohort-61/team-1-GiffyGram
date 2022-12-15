import { LoginForm } from "../auth/Login.js"


export const Navigation = () => {
    return `
        <nav class="navigation">
            <div class="navigation__item navigation__icon">
                <img src="/images/pb.png" alt="Giffygram icon" id="logo">
            </div>
            <div class="navigation__item navigation__name">
                Giffygram 
            </div>
            <div class="navigation__item navigation__search"> </div>
            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="/images/fountain-pen.svg" alt="Direct message">
                <div class="notification__count"> 0 </div>
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