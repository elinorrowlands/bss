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
    
    document.querySelector('main').appendChild(document.querySelector('.vectorised__container'));
    document.querySelector('main').appendChild(document.querySelector('.bridge__container'));
    document.querySelector('.vectorised__container').appendChild(document.querySelector('.beyond__container'));
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
        let distanceFromCentre = distance(x,y,window.innerWidth/2,window.innerHeight/2);
        // console.log('dist:',distanceFromCentre/window.innerWidth);
        // interpolateStates(distanceFromCentre/window.innerWidth);
        // const sineY = Math.sin((1 - (relative.y / relative.range.y) - 0.5) * Math.PI) * 0.5 + 0.5;
        const sineY = 0.1-( Math.abs(Math.sin(relative.y / (relative.range.y*0.8) * Math.PI))* 0.1);
        // let sineY = 0.2 + (0.8 - distanceFromCentre/window.innerWidth/2);
        // console.log(sineY);
        echo.delayTime.rampTo( (distanceFromCentre/window.innerWidth/2)+0.1, 0.9)
        // interpolateStates(relative.y / relative.range.y)
        // console.log('sineY',sineY, element.id)
        
        
        if (type == 'start' || type == 'enter') {
            player.playbackRate = 0.75;
            // if(element.id=='bridge__under')interpolateStates(sineY);
            interpolateStates(sineY);
            player2.volume.rampTo(-3,5);
            
            document.querySelectorAll('.beyond1remove,.beyond2remove').forEach(x=>{
                x.style.filter='sepia(100%) hue-rotate(220deg)'
                x.style.opacity=0.9;
            })
            document.querySelectorAll('canvas').forEach(x=>{
                x.style.opacity=0.5;
            })
            
            
            document.querySelectorAll('.vectorised__container').forEach(container => {
                container.style.opacity = 0.8;
            });

            document.querySelectorAll('.bridge__container').forEach(container => {
                container.style.opacity = 0.9;
                container.style.filter = `brightness(${y/window.innerHeight*20}%)`;
            });

            document.querySelectorAll('.photo__container').forEach(container => {
                container.style.opacity = 0.5;
            });
            document.querySelectorAll('.boundary__container').forEach(container => {
                container.style.opacity = 0.2;
                container.style.filter='blur(1px)';
            });
            // if(element.id == 'bridge__beyond') {
            //     document.querySelectorAll('.beyond__container').forEach(container => {
            //         container.style.opacity = 0.9;
            //         container.style.filter = 'sepia(100%)';
            //     });
            // }
        } else if (type == 'end' || type == 'leave') {
            player.playbackRate = 1;
            document.querySelectorAll('.beyond1remove,.beyond2remove').forEach(x=>x.style.filter='sepia(0%) hue-rotate(220deg)')
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
            document.querySelectorAll('canvas').forEach(x=>{
                x.style.opacity=0;
            })
            player2.volume.rampTo(-60,10);
            // if(element.id == 'bridge__beyond') {
            //     document.querySelectorAll('.beyond__container').forEach(container => {
            //         container.style.opacity = 0.9;
            //         container.style.filter = 'sepia(0%)';
            //     });
            // }
        } else if(type=='move'){
            if(element.id=='bridge__under')interpolateStates(sineY);
            lpf.frequency.rampTo(10000-(10000*(y/window.innerWidth)),0.1);
            if(element.id == 'bridge__beyond') {
                document.querySelectorAll('.beyond__container').forEach(container => {
                    container.style.opacity = 0.9;
                    // container.style.filter = 'sepia(100%)';
                });
            }
            document.querySelectorAll('.bridge__container').forEach(container => {
                container.style.opacity = 0.9;
                container.style.filter = `brightness(${y/window.innerHeight*20}%)`;
            });

            document.querySelector('.note_1').style.filter=`invert(${x%100}%) sepia(${x%100}%) saturate(4212%) hue-rotate(164deg) brightness(98%) contrast(103%) blur(${Math.abs(Math.sin(y/window.innerHeight/2))*20}px)`
            document.querySelector('.note_1').style.opacity=0.5;
            // console.log('move',x,y, e.detail)
            document.querySelectorAll('.vectorised__container').forEach(container => {
                container.style.opacity = 0.9;
            });

            document.querySelectorAll('.bridge__container').forEach(container => {
                container.style.opacity = 0.9;
                container.style.filter = 'brightness(10%)';
            });

            document.querySelectorAll('.photo__container').forEach(container => {
                container.style.opacity = sineY*2;
            });
            document.querySelectorAll('canvas').forEach(x=>{
                x.style.opacity=0.3;
            })
        }
    });
    loader();
    document.querySelectorAll('#toolbar').forEach(toolbar=>{
        toolbar.style.display='none';
    })
    interpolateStates(0.1);
    window.echo.wet.value = 0;
})

