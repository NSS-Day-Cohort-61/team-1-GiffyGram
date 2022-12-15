import { getUsers } from "../data/provider.js"
import { RegisterForm } from "./Register.js"


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "loginButton") {
        let foundUser = null
        const userState = getUsers()

        const email = document.querySelector("input[name='email']").value
        const password = document.querySelector("input[name='password']").value

        for (const user of userState) {
            if (user.email === email && user.password === password) {
                foundUser = user
            }
        }

        if (foundUser !== null) {
            localStorage.setItem("gg_user", foundUser.id)
            document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
})

export const LoginForm = () => {
    return `
    <nav class="navigation">
            <div class="navigation__item navigation__icon">
                <img src="/images/pb.png" alt="Giffygram icon" id="logo">
            </div>
            <div class="navigation__item navigation__name">
            Welcome to the World of GiffyGram
            </div>
        
       </nav> 

       <div class="loginForm">
       <h2> Sign in to Find and Share your Giftastic Gifs Today</h2>
            <form>
                <fieldset>
                    <label for="email">Email:</label>
                    <input type="text" name="email" autofocus placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" />
                </fieldset>
            </form>
            <button id="loginButton">Login</button>
            <button id="registerButton">Register</button>
        </div>
    `
}

// const applicationElement = document.querySelector(".giffygram")

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "registerButton") {
        document.querySelector(".giffygram").innerHTML = RegisterForm()
    }
})