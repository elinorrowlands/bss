function startElement(){
    Tone.start();
    document.querySelector('section.instructions').style.display = 'none';
    Tone.loaded().then(window.start);
}


const assignStartButton = function(){
    document.querySelectorAll('button.startElement').forEach(button=>{
        button.addEventListener('click', startElement);
    });
}

export default assignStartButton;