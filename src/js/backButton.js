function addBackButton(){
    let urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.has('from')){
        let home = urlParams.get('from');
    }
    
    if(urlParams.has('standalone') || document.querySelector(".nav__back")){
        return;
    }
    
    let homePage = urlParams.get('from') == 'map' ? 'map2' : 'index';
    let backButton = document.createElement("button");
    
    backButton.innerHTML = "Biodivergent Sites and Sounds"; 
    
    backButton.addEventListener('click',()=>{
        window.location = `https://elinorrowlands.github.io/bss/${homePage}.html`
    });
    
    backButton.id = "backButton";
    backButton.classList.add('button', 'nav__back', 'allowDefault')
    document.body.appendChild(backButton);
}

export default addBackButton