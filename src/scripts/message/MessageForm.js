import { getCurrentUser, getUsers, sendMessages } from "../data/provider.js";





const userMap = () => {
const users = getUsers()
const current = getCurrentUser()
   return users.map(
        (user) => {
            if (user.id !== current.id)
           { return `
            <option value="${user.id}">${user.name}</option>`}
        }
        ).join("")
}



export const createDirectMessage = () => {
    return `
    <div class="directMessage" id="msg__overlay">
        
        <h3> Direct Message</h3>
            <div>
            Recipient:
                <select name="directMessage__userSelect" class="message__input" id="recipientId">
                    <option>Choose a recipient.. </option>
                    ${userMap()}
                </select>
            </div>
            <div>
                <label for="message">Message:</label>
                <input type="text" name="message" class="message__input" placeholder="Message to user" />
           </div>
        
        <button id="directMessage__submit">Send</button>
        <button id="directMessage__cancel">Cancel</button>
        <button id="directMessage__close">x</button>

    </div>
  
    `
    
}
// applicationElement.innerHTML = GiffyGram()

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "directMessage__close" || clickEvent.target.id === "directMessage__cancel" ) {
        
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
}
)

applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "directMessage__submit") {
        const sender = getCurrentUser()
        const text = document.querySelector("input[name='message']").value
        const recipient = document.querySelector("select[id='recipientId']").value
      
        
    
        let messageDetails = {
            userId: parseInt(sender.id),
            recipientId: parseInt(recipient),
            messageText: text
        };
    
        if (!sender || !text || !recipient) {
            window.alert("Please out all entries")
        }
        else 
       { sendMessages(messageDetails);}




        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
}
)

document.querySelector(".giffygram").addEventListener("click", clickEvent => {
    if (clickEvent.target.class === "dm__receipt" || clickEvent.target.class === "msg__thread"){
        window.alert("click")
    }
})