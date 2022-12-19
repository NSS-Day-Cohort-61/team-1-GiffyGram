import { getCurrentUser, getMessages } from "../data/provider.js";
import { Navigation } from "../nav/Navigation.js";


export const displayMessagesPage = () => {

    const messages = getMessages()
    const user = getCurrentUser()

    let html = `
    <h1>Your Messages</h1>
    <div class="dm__display">`

                messages.map(
                    (message) => {
                        if (message.reipientId === user.id){
                            html += `<div class="dm__receipt"> ${message.messageText} </div>`
                        }
                    }
                )
            
    
    return html + `</div>`
}


