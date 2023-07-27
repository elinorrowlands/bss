// create html element (assign style in css)
// set timeout 

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

export default function createLoadingIndicator(){
    let loading = document.createElement('div');
    loading.classList.add('loading');
    loading.innerHTML = 'Loading...';
    document.body.appendChild(loading);
}