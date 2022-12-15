import {
    setDisplayFavorites,
    getDisplayFavorites
  } from "../data/provider.js";

import { getDisplaySinceYear, setDisplaySinceYear } from "../data/provider.js"

export const Footer = () => {
    const displayYear = getDisplaySinceYear()
    let html = `
        <footer class="footer">
            <div class="footer__item">
                Posts since
                <select id="yearSelection">`
                    if(displayYear === 2022) {
                        html += `
                        <option selected value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018>2018</option>
                        <option value="2017">2017</option>`
                    }
                    else if(displayYear === 2021) {
                        html += `
                        <option value="2022">2022</option>
                        <option selected value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018>2018</option>
                        <option value="2017">2017</option>`
                    }
                    else if(displayYear === 2020) {
                        html += `
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option selected value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018>2018</option>
                        <option value="2017">2017</option>`
                    }
                    else if(displayYear === 2019) {
                        html += `
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option selected value="2019">2019</option>
                        <option value="2018>2018</option>
                        <option value="2017">2017</option>`
                    }
                    else if(displayYear === 2018) {
                        html += `
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option selected value="2018>2018</option>
                        <option value="2017">2017</option>`
                    }
                    else if(displayYear === 2017) {
                        html += `
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018>2018</option>
                        <option selected value="2017">2017</option>`
                    }
                html += `</select>
                <span id="postCount">[POSTCOUNT]<span>
            </div>
            <div class="footer__item">
                Posts by user
                <select class="userSelection">
                    <option>Ray Medrano</option>
                    <option>Mark Ellis</option>
                    <option>D
            </div>
            <div class="footer__item">
                Show only favorites
                <input type="checkbox" id="showOnlyFavorites">
            </div>
       </footer> `
       return html
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

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "yearSelection") {
        setDisplaySinceYear(clickEvent.target.value)
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
})