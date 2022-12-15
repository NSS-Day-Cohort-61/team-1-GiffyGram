import { postEntryForm } from "./feed/PostEntry.js"

export const GiffyGram = () => {

    // Show main main UI
    return `
    <h1>Giffygram</h1>
    ${postEntryForm()}
    `
}
