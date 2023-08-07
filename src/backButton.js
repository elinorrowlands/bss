/**
 * Add a back button to the page, using the browser's history for the time being.
 */

function addBackButton(){
    var backButton = document.createElement("button");
    backButton.innerHTML = "Biodivergent Sites and Sounds";
    // backButton.setAttribute("onclick", "window.history.back()");
    backButton.setAttribute("onclick", "window.location = 'https://elinorrowlands.github.io/bss/'");
    backButton.id = "backButton";
    backButton.classList.add('button', 'nav__back')
    document.body.appendChild(backButton);
}

export default addBackButton