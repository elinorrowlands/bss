// create html element (assign style in css)
// set timeout 

export default function createLoadingIndicator(){
    let loading = document.createElement('div');
    loading.classList.add('loading');
    loading.innerHTML = 'Loading...';
}