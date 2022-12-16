import { getPostEntryStatus, setPostEntryStatus, sendPostEntry, getCurrentUser } from "../data/provider.js"

export const postEntryForm = () => {
  if (!getPostEntryStatus()) {
    return `
    <div class="miniMode" id="miniMode">Have a gif to post?</div>
    `
  } else {
    return `
    <div class="newPost">
    <div>
      <input value name="postTitle" class="newPost__input" type="text" placeholder="Title">
    </div>
    <div>
      <input value name="postURL" class="newPost__input" type="text" placeholder="URL of gif">
    </div>
    <textarea name="postDescription" class="newPost_input newPost__description" placeholder="Story behind your gif..."></textarea>
    <button id="newPost__submit">Save</button>
    <button id="newPost__cancel">Cancel</button>
    </div>
    `
  }
}

document.addEventListener("click", (event) => {
  if (event.target.id === "newPost__cancel") {
    setPostEntryStatus(false)
  }
})

document.addEventListener("click", (event) => {
  if (event.target.id === "miniMode") {
    setPostEntryStatus(true)
  }
})

document.addEventListener("click", (event) => {
  if (event.target.id === "newPost__submit") {
    const postTitle = document.querySelector("input[name='postTitle']").value
    const postURL = document.querySelector("input[name='postURL']").value
    const postDescription = document.querySelector("textarea[name='postDescription']").value
    const currentUser = getCurrentUser();
    const postInformation = {
      postTitle: postTitle,
      postURL: postURL,
      postDescription: postDescription,
      userId: currentUser.id,
      date: new Date()
    }
    sendPostEntry(postInformation)
  }
})
