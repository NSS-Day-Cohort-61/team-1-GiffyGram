import { getChosenTimespan, getUsers, getTimespans, getChosenUser, setChosenTimespan, setChosenUser } from "../data/provider.js"

export const Footer = () => {
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
                        if(chosenTime === timespan.id) {
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
                <select class="userSelection">
                    <option value="">All Users</option>`
                    for(const user of users) {
                        if(chosenUser === user.id) {
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
                <input type="checkbox" id="showOnlyFavorites">
            </div>
            <div class="footer__item">
                Total Posts
                [POSTCOUNT]
            </div>
       </footer> `
       return html;
}

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