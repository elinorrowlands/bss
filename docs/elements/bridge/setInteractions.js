function setInteractions(){
    touch.setAction('.interact')

    const interactions = {
        bridge: (e)=>{
            
            const {type, relative, rect, element} = e.detail;
            const {x, y} = relative;
            
            var value = 1 - Math.sin(cm.constrain((x/rect.original.width), 0, 1)*3.14);
            switch(type){
                case 'start':
                    // document.body.classList.add('liminal');
                    // document.querySelector('.interact').classList.add('liminal');
                    
                    interpolateStates(value);
                    element.style.opacity = 0.1 + (value * 0.7);
                    break;
                case 'enter':
                    // document.body.classList.add('liminal');
                    // document.querySelector('.interact').classList.add('liminal');
                    
                    interpolateStates(value);
                    element.style.opacity = 0.1 + (value * 0.7);
                    break;
                case 'move':
                    // document.body.classList.remove('liminal');
                    // document.querySelector('.interact').classList.remove('liminal');
                    document.querySelector('#backdrop').style.filter=`hue-rotate(${cm.constrain((x/rect.original.width)*360, 0, 360)}deg)`;
                    
                    interpolateStates(value);
                    element.style.opacity = 0.1 + (value * 0.7);
                    break;
                case 'leave':
                    // document.body.classList.add('liminal');
                    // document.querySelector('.interact').classList.add('liminal');
                    interpolateStates(0.92);
                    element.style.opacity = 0.1;
                    document.querySelectorAll('#backdrop').forEach(x=>xstyle.filter=`hue-rotate(0deg)`);
                    break;
                case 'end':
                    // document.body.classList.add('liminal');
                    // document.querySelector('.interact').classList.add('liminal');
                    interpolateStates(0.92);
                    element.style.opacity = 0.1;
                    document.querySelectorAll('#backdrop').forEach(x=>x.style.filter=`hue-rotate(0deg)`);
                    break;
            }
        },
        cover:(e)=>{
            e.detail.element.style.opacity = 0;
            if(player.state != 'started'){
                player.start();
            }
        },
        path:(e)=>{
            const {type, relative, rect, element} = e.detail;
            element.style.opacity = type == 'start' || type == 'move' || type == 'enter' ? 1 : 0.8;
            // switch(type){
            //     case 'start':
            //         element.style.opacity=0.1;
            //         break;
            //     case 'enter':
            //         element.style.opacity=0.1;
            //         break;
            //     case 'move':
            //         element.style.opacity=0;
            //         break;
            //     case 'leave':
            //         element.style.opacity=1;
            //         break;
            //     case 'end':
            //         element.style.opacity=1;
            //         break;
            // }
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
