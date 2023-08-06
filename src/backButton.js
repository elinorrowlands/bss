/**
 * Add a back button to the page, using the browser's history for the time being.
 */

function addBackButton(){
    var backButton = document.createElement("button");
    backButton.innerHTML = "Back";
    backButton.setAttribute("onclick", "window.history.back()");
    document.body.appendChild(backButton);
}

export default addBackButton