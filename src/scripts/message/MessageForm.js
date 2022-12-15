import { RegisterForm } from "../auth/Register.js";
import { getMessages, getUsers } from "../data/provider.js";
import { GiffyGram } from "../GiffyGram.js";

const messages = getMessages()
const users = getUsers()


export const createDirectMessage = () => {
    return `
    <div class="directMessage">
        
        <h3> Direct Message</h3>
            <div>
            Recipient:
                <select name="directMessage__userSelect" class="message__input">
                    <option>Choose a recipient.. </option>
                    ${
                        users.map(
                            (user) => {
                                return `<option value="${user.id}">${user.name}</option>`
                            }
                        ).join("")
                    }
                </select>
            </div>
            <div>
                <label for="message">Message:</label>
                <input type="text" name="message" class="message__input placeholder="Message to user" />
           </div>
        
        <button id="directMessage__submit">Save</button>
        <button id="directMessage__cancel">Cancel</button>
        <button id="directMessage__close">x</button>

    </div>
    ${GiffyGram()}
`
}

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "directMessage__close") {
        applicationElement.innerHTML = GiffyGram()
    }
}
)