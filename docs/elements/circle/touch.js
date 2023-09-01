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
    .setAction('.circ')

multitouchMapper.depth = 3;
const Pickup = (e) =>{
    let { element, type, query} = e.detail;
    console.log(type, element.id);
    let {y, x, range} = e.detail.relative;
    let id = element.parentElement.id;
    if(query=='.guide'){
        let linkedId = element.dataset.linked;
        let amount = (type == 'start' || type == 'enter' || type=='move') ? 200 : 0;
        document.querySelector(`#${linkedId}`).style.filter=`grayScale(${amount}%) brightness(${amount}%)`;
        sounds.notch2.Q.rampTo(amount/200, 0.1);
    } else if(element.dataset.loop){
        sounds[element.dataset.loop].volume.rampTo(-20,1);
    }
    
    if(type == 'start' || type == 'enter'){
        if(sounds[id]){
            sounds[id].volume.rampTo(-12,0.7);
            sounds.loop.volume.rampTo(-30,1);
        }
        if(query == '.circ'){
            sounds.can.start();
            sounds.can.reverse=false;
        }
    } else if (type == 'end' || type == 'leave'){
        if(sounds[id]){
            sounds[id].volume.rampTo(-Infinity,8);
            sounds.loop.volume.rampTo(-12,3);
        }
        if(query == '.circ'){
            if(sounds.can.state =='stopped') sounds.can.start();
            sounds.can.reverse = true;
        }
        document.body.style.filter = `hue-rotate(0deg)`;
    } else if(type == 'move'){
        sounds.can.playbackRate = (x/range.x)*2;
        document.body.style.filter = `hue-rotate(${element.x}deg)`;
        if(sounds[id])console.log(id, sounds[id].volume.value)
        let notchValue = 8000 * ((y)/range.y);
        sounds.notch.frequency.rampTo(notchValue, 0.1);
        notchValue = 8000 * ((x)/range.x);
        sounds.notch2.frequency.rampTo(notchValue, 1);
        console.log(e.detail.delta);
        console.log(sounds.echo.delayTime.value);
        sounds.echo.delayTime.rampTo(sounds.echo.delayTime.value + e.detail.delta.x/1000, 0.1);
    }
}

document.addEventListener('touch-pickup',(e)=>Pickup(e));