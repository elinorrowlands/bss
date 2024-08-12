const Pickup = (e, mix, captionObject) =>{
        
    const preset = {
        opacity:{
            start:0.7, enter:0.7, end:1, move:0.9, leave:1, cancel:0.5
        }
    }
    
    let { element, type, x, y } = e.detail;
    if(element.classList.contains('allowDefault')) return;
    
    let target = element;
    let text = captionObject[element.id.split('_')[1]];
    let container = document.querySelector('main') || document.body;
    if(type == 'start'){
        if(!window.playFlag){
            Tone.start().then(()=>mix.backdrop.start());
            window.playFlag = true;
        }
        window.onFlag = true;
        
        // container.style.filter = `hue-rotate(${element.style.left / window.innerWidth * 90}deg)`;
        mix.filter.frequency.rampTo((y)+80, 0.5);
        mix.filter.Q.rampTo(10, 2);
        
        element.classList.add('active');
        // element.style.left = `${x}px;`;
        // element.style.top = `${y}px;`;
        element.style.textShadow = `0px 5px 3px rgba(0,0,0,1)`;
        element.style.backgroundColor = `rgba(0,0,128,0.5)`;
        mix.channel.pan.rampTo((x/window.innerWidth*2)-1, 0.5);
        
        if(typeof text == 'undefined') return;
        if(mix.player.state!=started && typeof text.startS != 'undefined'){
            mix.player.start(Tone.now(), text.startS, text.endS-text.startS);
        }       
             
    } else if (type == 'end' || type == 'leave'){
        mix.channel.pan.rampTo(0.5, 2);
        mix.filter.frequency.rampTo(200, 1);
        element.classList.remove('active');
        
        element.style.textShadow = `0px 0px 10px rgba(0,0,128,0.4)`;
        container.filter = `hue-rotate(0deg)`;
        element.style.backgroundColor = `transparent`;
        window.onFlag = false;
        mix.filter.Q.rampTo(0, 0.2);
    } else if(type == 'move'){
        mix.echo.delayTime.rampTo( (y/window.innerHeight/8)+0.75, 0.1)
        // container.filter = `hue-rotate(${Math.floor(element.x/ window.innerWidth * 10)}deg)`;
        mix.filter.frequency.rampTo((y)+ 200, 0.1);
        // console.log(y);
        mix.channel.pan.rampTo((x/window.innerWidth*2)-1, 0.5);
        
        element.style.textShadow = `0px 0px 10px rgba(0,0,0,${(y/100)})`;
    }
    
    target.style.opacity = preset.opacity[type];
    
    window.setInterval(()=>{
        target.style.opacity = preset.opacity.cancel;
    }
    ,4000);
    
}

export default Pickup;