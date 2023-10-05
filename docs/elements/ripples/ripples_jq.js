
let container = 'body'
$(document).ready(function() {
    try {
    $(container).ripples({
        resolution: 256,
        dropRadius: 40, //px
        perturbance: 0.01,
        interactive:false,
        //- imageUrl: 'reflection1_symmetry.png'
    });
    
    }
    catch (e) {
    $('.error').show().text(e);
    }
    touch.setAction('.ripple__interact')
    //- document.querySelector('canvas').addEventListener('click',(e)=>{

    //-   //- $('#ripples__jq').ripples('drop',x,y, 50, 0.05)
    //-   //- $(container).ripples('drop',e.clientX,e.clientY, 50, 0.05)
    //-   //- $('#ripples__jq').ripples('drop',x,y, 5, 0.04)
    //- })
    window.addEventListener('touch-pickup',(e)=>{
    //- console.log('.', e.detail)
        // console.log('e.detail:', e.detail)
        let {x,y, type, query, element} = e.detail
        
        let newElement = document.querySelector(`.${element.id}`)
        // console.log('newElement:', newElement)
        
        if(type == 'start' || type == 'enter'){ 
            // console.log(query)
            if(query=='.ripple__interact'){
                newElement.classList.add('on')
                // console.log(newElement)
            //- element.style.opacity=0;
            }
            //- $('#ripples__jq').ripples('drop',x,y, 50, 0.05)
            //- $(container).ripples('set', 'interactive', true)
        } else if(type == 'end' || type == 'leave'){
            if(query=='.ripple__interact'){
            // console.log('on')
                newElement.classList.remove('on')
            }
            //- $(container).ripples('set', 'interactive', false)
            $(container).ripples('drop',x,y, 50, 0.05)
        } else if(type == 'move'){
            //- $('#ripples__jq').ripples('drop',x,y, 50, 0.05)
            //- $(container).ripples('setDropRadius', 50)
            $(container).ripples('drop',x,y, 50, 0.05)
        }
        //- $('#ripples__jq').ripples('drop',x,y, 5, 0.04)
    })
    
    
})

// central ripple
//- $('#ripples__jq').ripples('drop',window.innerWidth/2,window.innerHeight/2, 50, 0.05)