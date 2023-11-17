/**
 * Temporary fix until I have time to redo the layout.
 */

function forceIconLocation(){
    let infoIcon = document.querySelector('.icon__info');
    let rect = infoIcon.getBoundingClientRect();
    let footer = document.querySelector('footer');
    let footerRect = footer.getBoundingClientRect();
    if(rect.bottom > footerRect.top){
        infoIcon.style.transform = `translateY(${-100}px)`;
    }
}

window.addEventListener('load',()=>{
    // forceIconLocation();
    // balanceText();
})

