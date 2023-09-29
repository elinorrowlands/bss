window.addEventListener('load', ()=>{
    console.log('loaded');
    console.log(document.querySelector('svg'))
    assignClasses(document.querySelector('svg'), true, true);
})