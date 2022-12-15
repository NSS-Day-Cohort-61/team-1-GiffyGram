import { Footer } from "./nav/Footer.js"
import { Navigation } from "./nav/Navigation.js"
import { postList } from "./feed/PostList.js"
export const GiffyGram = () => {

    // Show main main UI
    return `${Navigation()}
    <div class="giffygram__feed">
            ${postList()}
            </div>
            ${Footer()}`
}
