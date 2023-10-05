function startElement(){
    Tone.start();
    // this should be classLIst.add('nodisplay')  but something in CSS is preventing that from working
    document.querySelector('section.instructions').classList.add('nodisplay')
    document.querySelector('section.instructions').style.display = 'none';
    document.querySelectorAll('.awaitStart').forEach(element=>{
        element.classList.remove('transparent')
    });
    document.querySelector('#infoButton').style.opacity = 1;
    touch.listen();
    window.scrollTo(0,0);
    Tone.loaded().then(window.start);
}


const assignStartButton = function(){
    document.querySelectorAll('button.startElement').forEach(button=>{
        touch.unlisten();
        button.innerHTML = 'Loading ...';
        Tone.loaded().then(()=>{
            button.innerHTML = 'Start';
        })
        button.addEventListener('click', startElement);
    });
}

export default assignStartButton;