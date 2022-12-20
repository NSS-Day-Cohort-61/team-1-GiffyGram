import { Footer } from "./nav/Footer.js"
import { Navigation } from "./nav/Navigation.js"
import { postList } from "./feed/PostList.js"
import { displayMessagesPage } from "./friends/DirectMessage.js"

export const GiffyGram = () => {

    // Show main main UI
    return `${Navigation()}
            <div id="message__form__popup"></div>
            
            <div class="giffygram__feed">
            ${postList()}
            </div>
            ${Footer()}`
}

