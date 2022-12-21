import { getPostEntryStatus, setPostEntryStatus, sendPostEntry, getCurrentUser, getPosts, updatePost } from "../data/provider.js"

export const postEntryForm = () => {
  if (!getPostEntryStatus()) {
    return `
    <div class="miniMode" id="miniMode">Have a gif to post?</div>
    `
  } else {
    return `
    <div class="newPost">
    <h2>Create a new post</h2>
    <div>
      <input value name="postTitle" class="newPost__input" type="text" placeholder="Title">
    </div>
    <div>
      <input value name="postURL" class="newPost__input" type="text" placeholder="URL of gif">
    </div>
    <textarea name="postDescription" class="newPost_input newPost__description" placeholder="Story behind your gif..."></textarea>
    <button id="newPost__submit">Post</button>
    <button id="newPost__cancel">Cancel</button>
    </div>
    `
  }
}

export const editPostForm = (postId) => {
  let posts = getPosts()
  let foundPost = posts.find((post) => post.id === postId)
  return `
  <div class="edit__post">
    <h2>Edit Your Post</h2>
    <div>
      <input name="edit_postTitle" class="newPost__input" type="text" value="${foundPost.postTitle}">
    </div>
    <div>
      <input name="edit_postURL" class="newPost__input" type="text" value="${foundPost.postURL}">
    </div>
    <textarea name="edit_postDescription" class="newPost_input newPost__description">${foundPost.postDescription}</textarea>
    <button id="editPost__submit--${postId}">Post</button>
    <button id="edit_post_cancel">Cancel</button>
  </div>
  `
}

document.addEventListener("click", (event) => {
  if (event.target.id === "newPost__cancel") {
    setPostEntryStatus(false)
  }
})

document.addEventListener("click", (event) => {
  if (event.target.id === "edit_post_cancel") {
    document.getElementById('edit_PostForm').innerHTML = ""
    document.getElementById('edit_PostForm').style.border = ""
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

document.addEventListener("click", (event) => {
  if (event.target.id.startsWith("editPost__submit")) {
    let [, postId] = event.target.id.split("--")
    postId = parseInt(postId)
    const postTitle = document.querySelector("input[name='edit_postTitle']").value
    const postURL = document.querySelector("input[name='edit_postURL']").value
    const postDescription = document.querySelector("textarea[name='edit_postDescription']").value
    const currentUser = getCurrentUser();
    const profilePayload = {
      postTitle: postTitle,
      postURL: postURL,
      postDescription: postDescription,
      userId: currentUser.id,
      date: new Date()
    }
    updatePost(postPayload, profileId)
  }
})