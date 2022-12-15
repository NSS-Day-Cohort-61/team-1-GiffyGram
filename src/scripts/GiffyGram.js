import { Footer } from "./nav/Footer.js"
import { postList } from "./feed/PostList.js"

export const GiffyGram = () => {

    return `<h1>Giffygram</h1>
            ${Footer()}

    ${postList()}`
}