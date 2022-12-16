import { getCurrentUser, getProfiles, updateProfile } from "../data/provider.js"
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
        bio
        </div>

        <div class="editProfile">
        <button id="edit">Edit Profile</button>
        </div>

        </section>`
        }


const profileForm = () =>{
        return `
        <div class="profileForm">
        <form class="profileDetails">
        <h2>Edit your Profile!</h2>
                <fieldset class="displayPic">
                    <label for="picture">Picture URL</label>
                    <input type="text" name="picture" autofocus placeholder="picture address"/>
                </fieldset>
                <fieldset class="displayBio">
                    <label for="bio">Fill out your Bio section!</label>
                    <input type="text" name="bio" placeholder="bio"/>
                </fieldset>
                <button id="acceptButton">Accept</button>
                <button id="cancelButton">Cancel</button>
            </form>
        </div>
    `
}

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "edit") {
        applicationElement.innerHTML = profileForm()
    }
}
)

applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "cancelButton") {
        applicationElement.innerHTML = Profile()
    }
}
)

document.addEventListener("click", (event) => {
    if (event.target.id === "acceptButton") {
      const newPicture = document.querySelector("input[name='picture']").value
      const newBio = document.querySelector("input[name='bio']").value
      const currentUser = getCurrentUser();
      const profileInformation = {
        picture: newPicture,
        bio: newBio,
        userId: currentUser.id
      }
      updateProfile(profileInformation)
    }
  })