// create html element (assign style in css)
// set timeout 

let loadingIndicator = {
    blinkCount: 0,
    createLoadingIndicator(){
        let loading = document.createElement('div');
        loading.classList.add('loading');
        loading.innerHTML = 'Loading...';
        document.body.appendChild(loading);
    },
    init(interval = 5000){
        this.createLoadingIndicator();
        setInterval(this.blink, interval);
    },
    blink(){
        document.querySelectorAll('.loadMsg')[0].style.opacity=loadBlinkCount%2 ? 0.8:1;
        document.querySelectorAll('.loading')[0].style.backgroundColor=loadBlinkCount%2 ? 'navy':'#0081ff';
        document.querySelectorAll('.loadMsg')[0].style.backgroundColor=loadBlinkCount%2 ? 'navy':'#0081ff';
        this.blinkCount++;
    }
}

function loaded(){
    // todo: add load status message for screen readers
    document.querySelectorAll('.loading').forEach(element => {
        clearInterval(loadBlink);
        element.style.opacity = 0;
        setTimeout(() => {
            element.style.display = 'none';
        }, 1000);
    });
}


export { loadingIndicator, loaded }