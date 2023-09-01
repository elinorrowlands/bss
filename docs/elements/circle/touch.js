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
    let { element, type, query} = e.detail;
    let {y, x, range} = e.detail.relative;
    let id = element.parentElement.id;
    if(query=='.guide'){
        let linkedId = element.dataset.linked;
        let amount = (type == 'start' || type == 'enter' || type=='move') ? 200 : 0;
        // if(sounds[id] && type=='move'){
        //     sounds[id].reverse = true;
        // }
        document.querySelector(`#${linkedId}`).style.filter=`grayScale(${amount}%) brightness(${amount}%)`;
        sounds.notch2.Q.rampTo(amount/100, 0.1);
    }
    
    if(type == 'start' || type == 'enter'){
        if(sounds[id]){
            sounds[id].volume.rampTo(-12,0.7);
            sounds.loop.volume.rampTo(-30,1);
        }
    } else if (type == 'end' || type == 'leave'){
        if(sounds[id]){
            sounds[id].volume.rampTo(-Infinity,1);
            sounds.loop.volume.rampTo(-12,3);
            // sounds[id].reverse = false;
        }
        document.body.style.filter = `hue-rotate(0deg)`;
    } else if(type == 'move'){
      
        document.body.style.filter = `hue-rotate(${element.x}deg)`;
        let notchValue = 8000 * ((y)/range.y);
        sounds.notch.frequency.rampTo(notchValue, 0.1);
        notchValue = 8000 * ((x)/range.x);
        sounds.notch2.frequency.rampTo(notchValue, 1);
    }
    
}

document.addEventListener('touch-pickup',(e)=>Pickup(e));