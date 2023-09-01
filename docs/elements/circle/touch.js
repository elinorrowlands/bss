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
    
    let id = element.id;
    if(query=='.guide'){
        console.log(query,id);    
    }
    
    if(type == 'start' || type == 'enter'){
        
    } else if (type == 'end' || type == 'leave'){
        
        document.body.style.filter = `hue-rotate(0deg)`;
    } else if(type == 'move'){
        document.body.style.filter = `hue-rotate(${element.x}deg)`;
    }
    
    
}

document.addEventListener('touch-pickup',(e)=>Pickup(e));