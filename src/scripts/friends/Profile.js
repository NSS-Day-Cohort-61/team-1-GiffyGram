import {
  getCurrentUser,
  getProfiles,
  updateProfile,
} from "../data/provider.js";
import { postList } from "../feed/PostList.js";
import { GiffyGram } from "../GiffyGram.js";
import { renderApp } from "../main.js";
import { Navigation } from "../nav/Navigation.js";

export const Profile = (user = getCurrentUser()) => {
  let currentUser = getCurrentUser();
  let profiles = getProfiles();

  let foundProfile = profiles.find((profile) => {
    return profile.userId === user.id;
  });
  if (foundProfile) {
    return `
        ${Navigation()}
        <section class="profilePage">
            <div class="profileName">
            <h1>${user.name}</h1>
            </div>
        
            <div class="profileContent">
            <div>
            <img class="profilePicture" src=${foundProfile.picture}>
            </div>
        
            <div class="profileBio">
            <h2>bio</h2>
            ${foundProfile.bio}
            </div>    
        </section>`;   
    }
    
    else if (!foundProfile && user.id && user.id !==currentUser.id) {
    return `
    ${Navigation()}
    <h3 class="profilePage">User has no profile!</h3>
    `
    } 
    else if (!foundProfile && user.id) {
    return `
        ${Navigation()}
        <div class="profileForm">
        <form class="profileDetails">
        <h2>Create your Profile!</h2>
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
        </div>`;
  }
  else {
    return `
    ${Navigation()}
    <h3 class="profilePage">Log in or register to create a profile!</h3>`
    }
};

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "cancelButton") {
    applicationElement.innerHTML = GiffyGram();
  }
});

document.addEventListener("click", (event) => {
  if (event.target.id === "acceptButton") {
    const newPicture = document.querySelector("input[name='picture']").value;
    const newBio = document.querySelector("input[name='bio']").value;
    const currentUser = getCurrentUser();
    const profileInformation = {
      picture: newPicture,
      bio: newBio,
      userId: currentUser.id,
    };
    updateProfile(profileInformation);

    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    applicationElement.innerHTML = Profile();
  }
});
