function setInteractions(){
    // set multitouch actions

    touch.setAction('.interact')

    const interactions = {
        bridge: (e)=>{
            
            const {type, relative, rect, element} = e.detail;
            const {x, y} = relative;
            
            var value = 1 - Math.sin(cm.constrain((x/rect.original.width), 0, 1)*3.14);
            switch(type){
                case 'start':
                    document.body.classList.add('liminal');
                    document.querySelector('.interact').classList.add('liminal');
                    
                    interpolateStates(value);
                    element.style.opacity = 0.1 + (value * 0.7);
                    break;
                case 'enter':
                    document.body.classList.add('liminal');
                    document.querySelector('.interact').classList.add('liminal');
                    
                    interpolateStates(value);
                    element.style.opacity = 0.1 + (value * 0.7);
                    break;
                case 'move':
                    document.body.classList.remove('liminal');
                    document.querySelector('.interact').classList.remove('liminal');
                    
                    
                    interpolateStates(value);
                    element.style.opacity = 0.1 + (value * 0.7);
                    break;
                case 'leave':
                    document.body.classList.add('liminal');
                    document.querySelector('.interact').classList.add('liminal');
                    interpolateStates(0.92);
                    element.style.opacity = 0.8;
                    break;
                case 'end':
                    document.body.classList.add('liminal');
                    document.querySelector('.interact').classList.add('liminal');
                    interpolateStates(0.92);
                    element.style.opacity = 0.8;
                    break;
            }
        },
        cover:(e)=>{
            e.detail.element.style.opacity = 0;
            if(player.state != 'started'){
                player.start();
            }
        }
    }

    document.addEventListener('touch-pickup',(e)=>{
        Object.entries(interactions).forEach(([key, value])=>{
            if(e.detail.element.id == key || e.detail.element.classList.contains(key)){
                value(e);
            }
        })
    })
}
