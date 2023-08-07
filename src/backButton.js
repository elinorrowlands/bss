/**
 * Add a back button to the page, using the browser's history for the time being.
 */

function addBackButton(){
    var backButton = document.createElement("button");
    backButton.innerHTML = "Back";
    backButton.setAttribute("onclick", "window.history.back()");
    backButton.id = "backButton";
    backButton.classList.add('nav__back')
    document.body.appendChild(backButton);
}

export default addBackButton