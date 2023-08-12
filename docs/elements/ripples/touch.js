/** 
    element, 
    type, 
    x, y, 
    query, 
    iterations, 
    rect, 
    origin, 
    relative, 
    distance, 
    path, 
    delta 
 */

// depending on which central script we're using, the instance of MultitouchMapper could be called touch or multitouchMapper

if(!window.multitouchMapper) window.multitouchMapper = window.touch;

multitouchMapper.setAction('.visual')

function getNoteFromId(id){
    let notes = [60,67,72];
    return Tone.Frequency(notes[parseInt(id.split('_')[1])%3], 'midi').toFrequency();
    // return Tone.Frequency((parseFloat(id.split('_')[1])%12)+60, 'midi').toFrequency()*1.5;
}

function getTarget(id){
    return document.querySelector(`#${id.split('_hc')[0]}`);
}

const Pickup = (e) =>{
    const preset = {
        transition:{
            start:0.5, enter:0.5, end:1, move:-1, leave:2
        },
        opacity:{
            start:0.5, enter:0.5, end:1, move:0.5, leave:1
        }
    }
    
    let { element, type } = e.detail;
    //todo: debounce, if needed...
    let target = getTarget(element.id);
    let value = preset.transition[type];
    
    if(value>-1){
        target.style.transition = `all ${value}s ease`;
    }
    
    let id = getNoteFromId(element.id);
    if(type == 'start' || type == 'enter'){
        synth.triggerAttack(id);
    } else if (type == 'end' || type == 'leave'){
        synth.triggerRelease(id);
        document.body.style.filter = `hue-rotate(0deg)`;
    } else if(type == 'move'){
        document.body.style.filter = `hue-rotate(${element.x}deg)`;
    }
    
    target.style.opacity = preset.opacity[type];

}

document.addEventListener('touch-pickup',(e)=>Pickup(e));