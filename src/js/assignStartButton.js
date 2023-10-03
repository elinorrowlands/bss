function startElement(){
    Tone.start();
    document.querySelector('section.instructions').classList.add('nodisplay');
    document.querySelectorAll('.awaitStart').forEach(element=>{
        element.classList.remove('transparent')
    });
    Tone.loaded().then(window.start);
}


const assignStartButton = function(){
    document.querySelectorAll('button.startElement').forEach(button=>{
        button.addEventListener('click', startElement);
    });
}

export default assignStartButton;