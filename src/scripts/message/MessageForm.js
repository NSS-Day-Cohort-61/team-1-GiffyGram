import { getMessages, getUsers } from "../data/provider.js";

const messages = getMessages()
const users = getUsers()


export const createDirectMessage = () => {
    return `
    <div class="messageForm">
        <form>
        <div>
        <label for="recipient">Recipient:</label>
            <select>
                <option type="text" name="recipient" value="0">"Choose a recipient.." </option>
                ${
                    users.map(
                        (user) => {
                            return `<option value="${user.id}">${user.name}</option>`
                        }
                    ).join("")
                }
            </select>
            </div>
            <label for="message">Message:</label><br>
            <input type="text" name="message" autofocus placeholder="Message to user" />
           
        </form>
        <button id="loginButton">Save</button>
        <button id="registerButton">Cancel</button>
    </div>
`
}