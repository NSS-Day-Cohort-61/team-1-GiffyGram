import { getCurrentUser, getMessages, getUsers } from "../data/provider.js";



export const displayMessagesPage = () => {

    const users = getUsers()
    const messages = getMessages()
    const user = getCurrentUser()

    let html = `
    <h1>Your Messages</h1>
    <div class="dm__display">`

        messages.map(
            (message) => {
                if (message.recipientId === user.id){
                    html += `<div id="markRead__${message.id}" class="dm__receipt"> From: ${
                        users.map(
                            (u) => {
                                if (message.userId === u.id){
                                    return u.name
                                }
                            }
                        ).join("")
                        
                    }
                        
                        <div id="markRead__${message.id}" class="msg__thread">    ${message.messageText} </div>
                        <div class="msg__reply"> Reply Button </div>
                    </div>`
                }
            }
        ).join("")
            
    
    return html + `</div>`
}


