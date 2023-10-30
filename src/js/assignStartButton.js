function startElement(){
    Tone.start();
    $('section.instructions').hide()
    
    document.querySelectorAll('.awaitStart').forEach(element=>{
        element.classList.remove('transparent')
    });
    
    $('main').show()
    document.querySelector('#infoButton').style.opacity = 1;
    touch.listen();
    window.scrollTo(0,0);
    Tone.loaded().then(window.start);
}


const assignStartButton = function(){
    touch.unlisten();
    document.querySelectorAll('button.startElement').forEach(button=>{
        button.innerHTML = 'Loading ...';
        Tone.loaded().then(()=>{
            button.innerHTML = 'Start';
        })
        button.addEventListener('click', startElement);
    });
}

export default assignStartButton;