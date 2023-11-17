function addButtons(){
    let urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.has('standalone') || document.querySelector(".nav__back")) return;
    
    let container = document.createElement("banner");
    container.classList.add('banner__title');
    
    let blank = document.createElement("div");
    blank.classList.add('blank');
    
    // let homePage = urlParams.get('from') == 'map' ? 'map2.html' : 'index.html';
    let homePage = urlParams.get('from') == 'map' ? 'map.html' : 'map.html';
    
    let backButton = document.createElement("button");
    
    // backButton.innerHTML = "Biodivergent Sites and Sounds";
    backButton.innerHTML = `<img class="title__back" src="../../svg/bss_title_small.svg" alt="Biodivergent Sites and Sounds" />` 
    backButton.id = "backButton";
    backButton.classList.add('title__button','nav__back', 'allowDefault')
    
    backButton.addEventListener('click',()=>{
        window.location = `https://elinorrowlands.github.io/bss/${homePage}`
    });


    let infoButton = document.createElement("button");
    infoButton.id="infoButton";
    infoButton.classList.add('nav__info', 'allowDefault');
    // infoButton.innerHTML = "?";
    infoButton.innerHTML = `<img class="title__info" src="../../icons/noun-help-2216482-FFFFFF.svg" alt="Help" />`
    infoButton.addEventListener('click',()=>{
        $('section.instructions').show(1000);
        // document.querySelector('section.instructions').classList.remove('nodisplay');
        // document.querySelector('section.instructions').style.display = 'flex';
        // document.querySelectorAll('.awaitStart').forEach(element=>{
        //     element.classList.add('transparent')
        // });
        $('main').hide(1000);
        // document.querySelector('#infoButton').classList.add('transparent');
        document.querySelector('#infoButton').style.opacity=0.5;
    });
    
    container.appendChild(backButton);
    container.appendChild(blank);
    container.appendChild(infoButton);
    document.body.appendChild(container);
    if(!document.querySelector('.instructions__header')) return;
    // if(document.querySelector('.instructions__header').getBoundingClientRect().top<0) {
    //     document.querySelector('.instructions').style.paddingTop = '800px';
    // }
}

export { addButtons }