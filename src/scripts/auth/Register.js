import { sendUsers } from "../data/provider.js"



export const RegisterForm = () => {
    return `
    <nav class="navigation">
    <div class="navigation__item navigation__icon">
        <img src="/images/pb.png" alt="Giffygram icon" id="logo">
    </div>
    <div class="navigation__item navigation__name">
        Giffygram
    </div>
    </nav> 


    <div class="registerForm">
        <h2> Sign Up To Find And Share Your Giftastic Gifs Today!</h2>
        <form>
            <fieldset class="register">
            <label for="name">Name:</label>
                    <input type="text" name="name" autofocus placeholder="Name" />
                <label for="email">Email:</label>
                <input type="text" name="email" autofocus placeholder="Email address" />
            </fieldset>
            <fieldset>
                <label for="password">Password:</label>
                <input type="password" name="password" placeholder="Password" />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" />
            </fieldset>
        </form>
        <button id="registerButton">Sign Up</button>
        <button id="returnButton">Return to Login</button>
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
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
})
