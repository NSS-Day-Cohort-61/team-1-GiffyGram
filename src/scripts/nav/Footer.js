import { getPosts } from "../data/provider.js"

export const Footer = () => {
    return `
        <footer class="footer">
            <div class="footer__item">
                Posts since
                <select id="yearSelection">
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                <span id="postCount">[POSTCOUNT]<span>
            </div>
            <div class="footer__item">
                Posts by user
                <select class="userSelection">
                    <option>Ray Medrano</option>
                    <option>Mark Ellis</option>
                    <option>Daniella Agnoletti</option>
                    <option>Kimmy Bird</option>
                    <option>Emily Lemmon</option>
                </select>
            </div>
            <div class="footer__item">
                Show only favorites
                <input type="checkbox" id="showOnlyFavorites">
            </div>
       </footer> `
}

const posts = getPosts()
const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "yearSelection") {
        for(const post of posts) {
            if()
        }
    }
})