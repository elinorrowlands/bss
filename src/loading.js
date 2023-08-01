let loadingIndicator = {
    blinkCount: 0,
    createLoadingIndicator(){
        let loading = document.createElement('div');
        loading.classList.add('loading');
        let loadH1 = document.createElement('h1');
        loadH1.classList.add('loadMsg');
        loadH1.innerHTML = 'Loading...';
        loading.appendChild(loadH1);
        document.body.appendChild(loading);
    },
    init(interval = 5000){
        this.createLoadingIndicator();
        window.loadBlink = setInterval(this.blink, interval);
        Tone.loaded().then(loaded)
    },
    blink(){
        let loadBlinkCount = this.blinkCount;
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