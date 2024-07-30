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
    touch.listen();
    window.scrollTo(0,0);
    Tone.loaded().then(window.start);
}

window.loadingMessage = function(){
    document.querySelectorAll('button.startElement').forEach(button=>{
        button.innerHTML = 'Loading sounds and images ...'
    });

}

/**
 * Set the action for start button only after Tone and required files are loaded
 * @param {Array} buffers - Array of sound files to load before enabling the start button
 */

const assignStartButton = function(){
    if(window.filesToLoad) {
        let buffers = window.filesToLoad;
        for(let i = 0; i < buffers.length; i++){
            buffers[i] = new Tone.Buffer(buffers[i]);
        }    
    }
    
    touch.unlisten();
    document.querySelectorAll('button.startElement').forEach(button=>{
        button.innerHTML = 'Loading ...';
        button.classList.add('waiting');
        
        button.addEventListener('click', loadingMessage)
        Tone.loaded().then(()=>{
            button.classList.remove('waiting');
            button.innerHTML = 'Start';
            button.removeEventListener('click', loadingMessage);
            button.addEventListener('click', startElement);
        })
    });
}

export default assignStartButton;