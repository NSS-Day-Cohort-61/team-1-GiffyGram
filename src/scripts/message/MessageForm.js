import { getMessages, getUsers } from "../data/provider.js";

const messages = getMessages()
const users = getUsers()


export const createDirectMessage = () => {
    return `
    <div class="messageForm">
        <form>
            <fieldset>
                <label for="recipient">Recipient:</label>
                <option type="text" name="recipient" value="0">"Choose a recipient.." </option>
                ${
                    users.map(
                        (user) => {
                            return `<option value="${user.id}">${user.name}</option>`
                        }
                    ).join("")
                }
            </fieldset>
            <fieldset>
                <label for="message">Message:</label>
                <textarea name="message" class="newPost_input newPost__description" placeholder="Story behind your gif..."></textarea>
            </fieldset>
        </form>
        <button id="loginButton">Login</button>
        <button id="registerButton">Register</button>
    </div>
`
}