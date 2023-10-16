/**
 * Prototype for the bridge interaction
 */

import loader from './setLoader.js';

function getContainerSvg(containerElement){
    do {
      containerElement = containerElement.parentElement;
  } while (containerElement.tagName !== 'svg');
  return containerElement;
  }

window.addEventListener('load',()=>{
    assignClasses(document.querySelector('svg'));
    document.querySelectorAll('image').forEach((x,i)=>{
        // if(i%2===0) return;
        let container = getContainerSvg(x);
        // console.log(container.classList)
        if(!container.classList.contains('note_1')) return;
        container.style.filter=`invert(${i*2}%) sepia(${i*2%100}%) saturate(4212%) hue-rotate(164deg) brightness(98%) contrast(103%)`
    })
    
    // document.querySelector('.split.trees').style.filter = `invert(${0}%) sepia(${55}%) saturate(4212%) hue-rotate(104deg) brightness(98%) contrast(103%)`
    
    // note: this could be triggered from a custom event to ensure correct order
    
    document.querySelectorAll('svg').forEach(svg=>{
        document.querySelector('.photo__container').appendChild(svg);
    })
    
    document.querySelectorAll('.vectorised').forEach(vectorImage=>{
        let container = getContainerSvg(vectorImage);
        container.classList.add('vectorised__parent');
        document.querySelector('.vectorised__container').appendChild(container);
    })
    
    // document.querySelectorAll('.beyond.photo').forEach(vectorImage=>{
    //     let container = getContainerSvg(vectorImage);
    //     container.classList.add('beyond__parent');
    //     document.querySelector('.beyond__container').appendChild(container);
    // })
    
    document.querySelectorAll('.vectorised.bridge__foreground').forEach(vectorImage=>{
        let container = getContainerSvg(vectorImage);
        container.classList.add('vectorised__parent');
        document.querySelector('.bridge__container').appendChild(container);
    })
    
    document.querySelectorAll('.boundary').forEach(vectorImage=>{
        let container = getContainerSvg(vectorImage);
        container.classList.add('vectorised__parent');
        document.querySelector('.boundary__container').appendChild(container);
    })
    
    document.querySelector('main').appendChild(document.querySelector('.beyond__container'));
    document.querySelector('main').appendChild(document.querySelector('.vectorised__container'));
    document.querySelector('main').appendChild(document.querySelector('.bridge__container'));
    document.querySelector('main').replaceWith(document.querySelector('main'))
    
    touch.setAction('.interact');
    window.playFlag = false;
    document.querySelectorAll('#nav__start').forEach(x=>{
        x.addEventListener('click',()=>{
          
                if(!window.playFlag) {
                    window.playFlag = true;
                    window.playToggle();
                }
          
        })    
    })
    window.addEventListener('touch-pickup', e => {
        let { element, type, x,y, relative } = e.detail;
        
        function distance(x1, y1, x2, y2){
            return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
        }
        
        // console.log(x, y, window.innerWidth, window.innerHeight, distance(x,y,window.innerWidth/2,window.innerHeight/2))
        // let distanceFromCentre = distance(x,y,window.innerWidth/2,window.innerHeight/2);
        // console.log('dist:',distanceFromCentre/window.innerWidth);
        // interpolateStates(distanceFromCentre/window.innerWidth);
        // const sineY = Math.sin((1 - (relative.y / relative.range.y) - 0.5) * Math.PI) * 0.5 + 0.5;
        const sineY = 0.1-( Math.abs(Math.sin(relative.y / (relative.range.y*0.8) * Math.PI))* 0.1);
        // interpolateStates(relative.y / relative.range.y)
        // console.log('sineY',sineY, element.id)
        
        
        if (type == 'start' || type == 'enter') {
            if(element.id=='bridge__under')interpolateStates(sineY);
           
          
            
            
            document.querySelectorAll('.vectorised__container').forEach(container => {
                container.style.opacity = 0.8;
            });

            document.querySelectorAll('.bridge__container').forEach(container => {
                container.style.opacity = 0.9;
                container.style.filter = 'brightness(10%)';
            });

            document.querySelectorAll('.photo__container').forEach(container => {
                container.style.opacity = 0.1;
            });
            document.querySelectorAll('.boundary__container').forEach(container => {
                container.style.opacity = 0;
            });
            // if(element.id == 'bridge__beyond') {
            //     document.querySelectorAll('.beyond__container').forEach(container => {
            //         container.style.opacity = 0.9;
            //         container.style.filter = 'sepia(100%)';
            //     });
            // }
        } else if (type == 'end' || type == 'leave') {
            console.log('end',x,y, e.detail)
            interpolateStates(0.1);
            echo.wet.rampTo(0, 0.1);
            document.querySelectorAll('.vectorised__container').forEach(container => {
                container.style.opacity = 0.1;
            });

            document.querySelectorAll('.bridge__container').forEach(container => {
                container.style.opacity = 0.1;
                container.style.filter = 'brightness(100%)';
            });

            document.querySelectorAll('.photo__container').forEach(container => {
                container.style.opacity = 1;
            });
            // if(element.id == 'bridge__beyond') {
            //     document.querySelectorAll('.beyond__container').forEach(container => {
            //         container.style.opacity = 0.9;
            //         container.style.filter = 'sepia(0%)';
            //     });
            // }
        } else if(type=='move'){
            if(element.id=='bridge__under')interpolateStates(sineY);
            if(element.id == 'bridge__beyond') {
                document.querySelectorAll('.beyond__container').forEach(container => {
                    container.style.opacity = 0.9;
                    container.style.filter = 'sepia(100%)';
                });
            }
            // console.log('move',x,y, e.detail)
            document.querySelectorAll('.vectorised__container').forEach(container => {
                container.style.opacity = 0.9;
            });

            document.querySelectorAll('.bridge__container').forEach(container => {
                container.style.opacity = 0.9;
                container.style.filter = 'brightness(10%)';
            });

            document.querySelectorAll('.photo__container').forEach(container => {
                container.style.opacity = 0.1;
            });
        }
    });
    loader();
    document.querySelectorAll('#toolbar').forEach(toolbar=>{
        toolbar.style.display='none';
    })
})

