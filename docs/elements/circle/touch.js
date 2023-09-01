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

let volumeBuffer = {
    loop2:false,
    loop3:false,
}

multitouchMapper
    .setAction('#canvas')
    .setAction('.guide')
    .setAction('.circ')
let counter1 = 0;
multitouchMapper.depth = 3;
const Pickup = (e) =>{
    let { element, type, query} = e.detail;
    console.log(counter1)
    
    let {y, x, range} = e.detail.relative;
    let id = element.dataset.sound;
    if(query=='.guide'){
        let linkedId = element.dataset.linked;
        let amount = (type == 'start' || type == 'enter' || type=='move') ? 200 : 0;
        document.querySelector(`#${linkedId}`).style.filter=`grayScale(${amount}%) brightness(${amount}%)`;
        // sounds.notch2.Q.rampTo(amount/200, 0.1);
    } else if(element.dataset.loop){
        // sounds[element.dataset.loop].volume.rampTo(-20,1);
    }
    
    if(type == 'start' || type == 'enter'){
        if(sounds[id]){
            volumeBuffer[id]+=1;
            sounds[id].volume.rampTo(-12,1);
            sounds.loop.volume.rampTo(-30,1);
            sounds.loop.reverse = true;
        }
        if(query == '.circ'){
            sounds.can.start();
            sounds.can.reverse=false;
        }
    } else if (type == 'end' || type == 'leave'){
        counter1++;
        if(sounds[id]){
            volumeBuffer[id]-=1;
            console.log(volumeBuffer[id])
            sounds[id].volume.rampTo(-Infinity,8);
            sounds.loop.volume.rampTo(-12,3);
            sounds.loop.reverse = false;
        }
        if(query == '.circ'){
            if(sounds.can.state =='stopped') sounds.can.start();
            sounds.can.reverse = true;
        }
        document.body.style.filter = `hue-rotate(0deg)`;
    } else if(type == 'move'){
        sounds.can.playbackRate = (x/range.x)*2;
        // document.body.style.filter = `hue-rotate(${element.x}deg)`;
        if(sounds[id]){
            // sounds[id].volume.rampTo(-12,1);
            
        }
        let notchValue = 4000+(4000 * ((y)/range.y));
        sounds.notch.frequency.rampTo(notchValue, 1);
        notchValue = 4000+(4000 * ((x)/range.x));
        sounds.notch2.frequency.rampTo(notchValue, 1);
        // console.log(e.detail.delta);
        // console.log(sounds.echo.delayTime.value);
        if(e.detail.delta.x>10)sounds.echo.delayTime.rampTo(sounds.echo.delayTime.value + e.detail.delta.x/1000, 1);
        // console.log(e.detail.delta.x*100, 'delta')
        // document.querySelector('#content').style.filter = `brightness(${Math.floor(e.detail.delta.x *300)}%)`;
    }
}

document.addEventListener('touch-pickup',(e)=>Pickup(e));