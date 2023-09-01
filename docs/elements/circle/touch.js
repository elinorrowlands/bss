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

if(!window.multitouchMapper) multitouchMapper = window.touch;

document.querySelectorAll('path').forEach((element,i) => {
    if(!element.id) element.id = `path_${i}`;
})

multitouchMapper
    .setAction('#canvas')
    .setAction('.guide')

const Pickup = (e) =>{
    let { element, type, query } = e.detail;
    let id = element.parentElement.id;
    if(query=='.guide'){
        let linkedId = element.dataset.linked;
        let amount = (type == 'start' || type == 'enter' || type=='move') ? 200 : 0;
        document.querySelector(`#${linkedId}`).style.filter=`grayScale(${amount}%) brightness(${amount}%)`;
    }
    
    if(type == 'start' || type == 'enter'){
        if(sounds[id]){
            sounds[id].volume.rampTo(-12,0.3);
            sounds.loop.volume.rampTo(-30,1);
        }
    } else if (type == 'end' || type == 'leave'){
        if(sounds[id]){
            sounds[id].volume.rampTo(-Infinity,1);
            sounds.loop.volume.rampTo(-12,3);
        }
        document.body.style.filter = `hue-rotate(0deg)`;
    } else if(type == 'move'){
        document.body.style.filter = `hue-rotate(${element.x}deg)`;
    }
    
}

document.addEventListener('touch-pickup',(e)=>Pickup(e));