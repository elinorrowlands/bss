function startElement(){
    Tone.start();
    $('section.instructions').hide()
    
    document.querySelectorAll('.awaitStart').forEach(element=>{
        element.classList.remove('transparent')
    });
    
    $('main').show()
    $('#infoButton').show();
    document.querySelector('#infoButton').style.opacity = 1;
    document.querySelector('.banner__background').style.opacity = 0;
    document.querySelector('.banner__background').classList.add('muted');
    document.querySelector('.startElement').innerHTML = 'RETURN<br>TO<br>ELEMENT';
    console.log('startbutton')
    touch.listen();
    window.scrollTo(0,0);
    Tone.loaded().then(window.start);
}

window.loadingMessage = function(){
    document.querySelectorAll('button.startElement').forEach(button=>{
        button.innerHTML = 'Loading sounds and images ...'
    });

}

const assignStartButton = function(){
    touch.unlisten();
    document.querySelectorAll('button.startElement').forEach(button=>{
        button.innerHTML = 'Loading ...';
        console.log('🟢 assignStart from mainjs -- before tone.loaded')
        button.addEventListener('click', loadingMessage)
        Tone.loaded().then(()=>{
            console.log('🟢 assignStart from mainjs -- after tone.loaded')
            button.innerHTML = 'Start';
            button.addEventListener('click', startElement);
        })
    });
}

export default assignStartButton;