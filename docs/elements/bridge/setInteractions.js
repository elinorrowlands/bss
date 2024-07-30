/**
 * Set interactions for the bridge, cover, and path elements
 */

const setInteractions = function(){
    touch.setAction('.interact')

    const interactions = {
        bridge: (e)=>{
            
            const {type, relative, rect, element} = e.detail;
            const {x, y} = relative;
            
            
            var value = 1 - Math.sin(cm.constrain((x/rect.original.width), 0, 1)*3.14);
            
            let photo = document.querySelector('#photo');
            switch(type){
                case 'start':
                    
                    interpolateStates(value);
                    element.style.opacity = 1 - (0.1 + (value * 0.7));
                    element.style.strokeWidth = 10;
                    photo.style.opacity = (0.1 + (value * 0.7));
                    document.querySelector('#backdrop').style.opacity = (0.1 + (value * 0.9));
                    break;
                case 'enter':
            
                    document.querySelector('#backdrop').style.opacity = (0.1 + (value * 0.9));
                    interpolateStates(value);
                    element.style.strokeWidth = 10;
                    element.style.opacity = 1 - (0.1 + (value * 0.7));
                    photo.style.opacity = (0.1 + (value * 0.7));
                    break;
                case 'move':
                    document.querySelector('#backdrop').style.filter=`hue-rotate(${8250 + Math.floor(cm.constrain((x/rect.original.width)*100, 0, 360))}deg)`;
                    document.querySelector('#backdrop').style.opacity = (0.1 + (value * 0.9));
                    console.log(Math.floor(cm.constrain((x/rect.original.width)*100, 0, 360)))
                    
                    interpolateStates(value);
                    element.style.strokeWidth = 10;
                    element.style.opacity = 1 - (0.1 + (value * 0.7));

                    photo.style.opacity = (0.1 + (value * 0.7));
                    break;
                case 'leave':
            
                    interpolateStates(1);
                    element.style.opacity = 0;
                    element.style.strokeWidth = 0;
                    document.querySelectorAll('#backdrop').forEach(x=>x.style.filter=`hue-rotate(8250deg)`);
                    document.querySelectorAll('#backdrop').forEach(x=>x.style.opacity=1);
                    photo.style.opacity=1;
                    break;
                case 'end':
            
                    element.style.strokeWidth=0;
                    interpolateStates(1);
                    element.style.opacity = 0;
                    photo.style.opacity=1;
                    document.querySelectorAll('#backdrop').forEach(x=>x.style.filter=`hue-rotate(8250deg)`);
                    document.querySelectorAll('#backdrop').forEach(x=>x.style.opacity=1);
                    break;
            }
        },
        cover:(e)=>{
            e.detail.element.style.opacity = 0;
            
            if(player.state != 'started'){
            
                Tone.start()
                player.start();
                player2.start();
            }
        },
        path:(e)=>{
            const {type, relative, rect, element} = e.detail;
            element.style.opacity = (type == 'start' || type == 'move' || type == 'enter') ? 1 : 0.8;
            element.style.stroke=(type == 'start' || type == 'move' || type == 'enter') ? '#fff' : '#000';
            element.style.strokeWidth =(type == 'start' || type == 'move' || type == 'enter') ? 1 : 0;
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

export default setInteractions;