function setInteractions(){
    touch.setAction('.interact')

    const interactions = {
        bridge: (e)=>{
            
            const {type, relative, rect, element} = e.detail;
            const {x, y} = relative;
            // const {x, y} = e.detail;
            
            var value = 1 - Math.sin(cm.constrain((x/rect.original.width), 0, 1)*3.14);
            // var value = 1 -Math.sin(cm.constrain((x/window.InnerWidth), 0, 1)*3.14);
            console.log('value',value)
            let photo = document.querySelector('#photo');
            switch(type){
                case 'start':
                    // document.body.classList.add('liminal');
                    // document.querySelector('.interact').classList.add('liminal');
                    
                    interpolateStates(value);
                    element.style.opacity = 1 - (0.1 + (value * 0.7));
                    // element.style.strokeWidth = 10;
                    photo.style.opacity = (0.1 + (value * 0.7));
                    break;
                case 'enter':
                    // document.body.classList.add('liminal');
                    // document.querySelector('.interact').classList.add('liminal');
                    
                    interpolateStates(value);
                    // element.style.strokeWidth = 10;
                    element.style.opacity = 1 - (0.1 + (value * 0.7));
                    photo.style.opacity = (0.1 + (value * 0.7));
                    break;
                case 'move':
                    // document.body.classList.remove('liminal');
                    // document.querySelector('.interact').classList.remove('liminal');
                    document.querySelector('#backdrop').style.filter=`hue-rotate(${Math.floor(cm.constrain((x/rect.original.width)*100, 0, 360))}deg)`;
                    console.log(Math.floor(cm.constrain((x/rect.original.width)*100, 0, 360)))
                    
                    interpolateStates(value);
                    // element.style.strokeWidth = 0;
                    element.style.opacity = 1 - (0.1 + (value * 0.7));

                    photo.style.opacity = (0.1 + (value * 0.7));
                    break;
                case 'leave':
                    // document.body.classList.add('liminal');
                    // document.querySelector('.interact').classList.add('liminal');
                    
                    // interpolateStates(0.92);
                    interpolateStates(1);
                    element.style.opacity = 0;
                    document.querySelectorAll('#backdrop').forEach(x=>x.style.filter=`hue-rotate(50deg)`);
                    photo.style.opacity=1;
                    break;
                case 'end':
                    // document.body.classList.add('liminal');
                    // document.querySelector('.interact').classList.add('liminal');
                    // interpolateStates(0.92);
                    interpolateStates(1);
                    element.style.opacity = 0;
                    photo.style.opacity=1;
                    document.querySelectorAll('#backdrop').forEach(x=>x.style.filter=`hue-rotate(50deg)`);
                    break;
            }
        },
        cover:(e)=>{
            e.detail.element.style.opacity = 0;
            
            if(player.state != 'started'){
                console.log('cover')
                Tone.start()
                player.start();
            }
        },
        path:(e)=>{
            const {type, relative, rect, element} = e.detail;
            element.style.opacity = (type == 'start' || type == 'move' || type == 'enter') ? 1 : 0.8;
            element.style.stroke=(type == 'start' || type == 'move' || type == 'enter') ? '#fff' : '#000';
            element.style.strokeWidth =(type == 'start' || type == 'move' || type == 'enter') ? 1 : 0;
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
