import { getCurrentUser, getMessages } from "../data/provider.js";
import { Navigation } from "../nav/Navigation.js";

const messages = getMessages()
const user = getCurrentUser()

export const displayMessagesPage = () => {


    return `
        ${Navigation}
        <h1>Your Messages</h1>
            ${
                messages.map(
                    (message) => {
                        if (message.reipientId === user.id){
                            return `<div> ${message.messageText} </div>`
                        }
                    }
                )
            }
    
    `
}


const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.class === "notification__count") {

        applicationElement.innerHTML = displayMessagesPage()
     
    }
}
)

