import { getCurrentUser } from "../data/provider.js"
import { Navigation } from "../nav/Navigation.js"

export const Profile = () =>{
    let user = getCurrentUser()

         return`
        ${Navigation()}
        <section class="profilePage">

        <div class="profileName">
        <h1>${user.name}</h1>
        </div>

        <div class="profileContent">
        <div>
        <img class="profilePicture" src="https://i.gifer.com/embedded/download/WmG.gif">
        </div>

        <div class="profileBio">
        i love unicorn weiner dogs
        </div>

        </div>
        </section>`

}
