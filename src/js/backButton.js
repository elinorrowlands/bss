function addBackButton(){
    let urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.has('standalone') || document.querySelector(".nav__back")) return;
    
    let homePage = urlParams.get('from') == 'map' ? 'map2' : 'index';
    
    let backButton = document.createElement("button");
    
    backButton.innerHTML = "Biodivergent Sites and Sounds"; 
    backButton.id = "backButton";
    backButton.classList.add('button', 'nav__back', 'allowDefault')
    
    backButton.addEventListener('click',()=>{
        window.location = `https://elinorrowlands.github.io/bss/${homePage}.html`
    });
    
    let infoButton = document.createElement("button");
    infoButton.id="infoButton";
    infoButton.classList.add('button', 'nav__info', 'allowDefault');
    infoButton.innerHTML = "?";
    infoButton.addEventListener('click',()=>{
        document.querySelector('section.instructions').classList.remove('nodisplay');
    });
    
    document.body.appendChild(backButton);
}

export default addBackButton