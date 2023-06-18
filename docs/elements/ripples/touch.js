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

multitouchMapper.setAction('.visual')

function getNoteFromId(id){
    return Tone.Frequency(1*(parseFloat(id.split('_')[1])%12)+72, 'midi').toFrequency()
}

function getTarget(id){
    return document.querySelector(`#${id.split('_hc')[0]}`);
}

/**
 * For touch listener
 * 
 */

const Pickup = (e) =>{
    const preset = {
        transition:{
            start:0.1, enter:0.1, end:1, move:-1, leave:1
        },
        opacity:{
            start:0.3, enter:0.3, end:1, move:0.1, leave:1
        }
    }
    
    let { element, type } = e.detail;
    //todo: debounce
    let target = getTarget(element.id);
    let value = preset.transition[type];
    if(value>-1){
        target.style.transition = `all ${value}s ease`;
    }
    
    
    console.log(type, target.style.transition)
    
    if(type == 'start' || type == 'enter'){
        synth.triggerAttack(getNoteFromId(element.id));
    } else if (type == 'end' || type == 'leave'){
        synth.triggerRelease(getNoteFromId(element.id));
    }
    target.style.opacity = preset.opacity[type];
    
}

document.addEventListener('touch-pickup',(e)=>Pickup(e));