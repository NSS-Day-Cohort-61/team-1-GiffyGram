import { getChosenTimespan, getDisplayFavorites, getUsers, getTimespans, getChosenUser, setDisplayFavorites, setChosenTimespan, setChosenUser, getDisplayPostCount } from "../data/provider.js"

export const Footer = () => {
    let checkedStatus = getDisplayFavorites() ? "checked" : ""
    const chosenTime = getChosenTimespan()
    const chosenUser = getChosenUser()
    const users = getUsers()
    const timespans = getTimespans()
    let html = `
        <footer class="footer">
            <div class="footer__item">
                Posts since
                <select id="timespanSelection">
                    <option value="">Forever</option>`
                    for(const timespan of timespans) {
                        if(parseInt(chosenTime) === timespan.id) {
                            html += `<option selected value="${timespan.id}">${timespan.name}</option>`;
                        } 
                        else {
                        html += `<option value="${timespan.id}">${timespan.name}</option>`;
                        }
                    }
        html +=`</select>
            </div>
            <div class="footer__item">
                Posts by user
                <select id="userSelection">
                    <option value="">All Users</option>`
                    for(const user of users) {
                        if(parseInt(chosenUser) === user.id) {
                            html += `<option selected value="${user.id}">${user.name}</option>`;
                        } 
                        else {
                            html += `<option value="${user.id}">${user.name}</option>`;
                        }
                    }
                html+= `</select>
            </div>
            <div class="footer__item">
                Show only favorites
                <input type="checkbox" id="showOnlyFavorites" ${checkedStatus}>
            </div>
            <div class="footer__item">
                Total Posts Displayed
                ${getDisplayPostCount()}
            </div>
       </footer> `
       return html;
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

applicationElement.addEventListener("change", changeEvent => {
    if(changeEvent.target.id === "timespanSelection") {
        setChosenTimespan(changeEvent.target.value)
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
})

applicationElement.addEventListener("change", changeEvent => {
    if(changeEvent.target.id === "userSelection") {
        setChosenUser(changeEvent.target.value)
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
})