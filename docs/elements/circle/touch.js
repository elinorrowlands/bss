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

// currently adapting for other pages

if(!window.multitouchMapper) multitouchMapper = window.touch;

multitouchMapper.setAction('.visual')
    .setAction('.canBG')
    .setAction('.canvas')

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
    let { element, type } = e.detail;
    let target = getTarget(element.id);
    let value = preset.transition[type];
    
    let id = getNoteFromId(element.id);
    if(type == 'start' || type == 'enter'){
        
    } else if (type == 'end' || type == 'leave'){
        
        document.body.style.filter = `hue-rotate(0deg)`;
    } else if(type == 'move'){
        document.body.style.filter = `hue-rotate(${element.x}deg)`;
    }
    
    
}

document.addEventListener('touch-pickup',(e)=>Pickup(e));