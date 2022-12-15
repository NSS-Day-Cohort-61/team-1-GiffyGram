import { sendUsers } from "../data/provider.js"
import { LoginForm } from "./Login.js"



export const RegisterForm = () => {
    return `
    <nav class="navigation">
    <div class="navigation__item navigation__icon">
        <img src="/images/pb.png" alt="Giffygram icon" id="logo">
    </div>
    <div class="navigation__item navigation__name">
   Find and Share your gifs today!
    </div>
    </nav> 


    <div class="registerForm">
    <form class="registerDetails">
    <h2> Create Account</h2>
            <fieldset class="register">
            <label for="name">Name:</label>
                    <input type="text" name="name" autofocus placeholder="Name" />
                
            </fieldset>
            <fieldset class="register">
           
                <label for="email">Email:</label>
                <input type="text" name="email" autofocus placeholder="Email address" />
            </fieldset>
            <fieldset class="register">
                <label for="password">Password:</label>
                <input type="password" name="password" placeholder="Password" />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" />
            </fieldset>
            <button id="registerButton">Sign Up</button>
            <button id="returnButton">Return to Login</button>
        </form>
    </div>
`
}



document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "registerButton") {
        const email = document.querySelector("input[name='email']").value
        const name = document.querySelector("input[name='name']").value
        const password = document.querySelector("input[name='password']").value
        const confirm = document.querySelector("input[name='confirmPassword']").value
        if (confirm !== password) {
            window.alert("Please make sure your password matches")
        }
        if (password === confirm) {

            const dataToSendToAPI = {
                name: name,
                email: email,
                password: password,
            }
            
            if (!name || !email || !password){
                return window.alert("Please fill out all entries")
            }
            else {
                sendUsers(dataToSendToAPI)
                document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
            }
        }
       
   
 

    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "returnButton") {
        document.querySelector(".giffygram").innerHTML = LoginForm()
    }
})
