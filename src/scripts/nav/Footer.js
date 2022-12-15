import {
    setDisplayFavorites,
    getDisplayFavorites
  } from "../data/provider.js";

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

document.addEventListener("click", (event) => {
    if (event.target.id === "showOnlyFavorites") {
      if (getDisplayFavorites()) {
        setDisplayFavorites(false);
      } else {
        setDisplayFavorites(true);
      }
    }
  });