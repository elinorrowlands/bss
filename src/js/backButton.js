function addBackButton(){
    let urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.has('standalone') || document.querySelector(".nav__back")) return;
    
    let homePage = urlParams.get('from') == 'map' ? 'map2' : 'index';
    
    let backButton = document.createElement("button");
    
    // backButton.innerHTML = "Biodivergent Sites and Sounds";
    backButton.innerHTML = `<img class="title__back" src="../../svg/bss_title_small.svg" alt="Biodivergent Sites and Sounds" />` 
    backButton.id = "backButton";
    backButton.classList.add('title__button','nav__back', 'allowDefault')
    
    backButton.addEventListener('click',()=>{
        window.location = `https://elinorrowlands.github.io/bss/${homePage}.html`
    });
    
    let infoButton = document.createElement("button");
    infoButton.id="infoButton";
    infoButton.classList.add('nav__info', 'allowDefault');
    // infoButton.innerHTML = "?";
    infoButton.innerHTML = `<img class="title__info" src="../../icons/noun-help-2216482-FFFFFF.svg" alt="Help" />`
    infoButton.addEventListener('click',()=>{
        
        document.querySelector('section.instructions').classList.remove('nodisplay');
        document.querySelector('section.instructions').style.display = 'flex';
        document.querySelectorAll('.awaitStart').forEach(element=>{
            element.classList.add('transparent')
        });
        // document.querySelector('#infoButton').classList.add('transparent');
        document.querySelector('#infoButton').style.opacity=0.5;
    });
    
    document.body.appendChild(backButton);
    document.body.appendChild(infoButton)
}

export default addBackButton