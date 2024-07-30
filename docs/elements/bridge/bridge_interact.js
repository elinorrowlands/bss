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
        let container = getContainerSvg(x);
        if(!container.classList.contains('note_1')) return;
        container.style.filter=`invert(${i*2}%) sepia(${i*2%100}%) saturate(4212%) hue-rotate(164deg) brightness(98%) contrast(103%)`
    })
    
    
    // note: this could be triggered from a custom event to ensure correct order
    
    document.querySelectorAll('svg').forEach(svg=>{
        document.querySelector('.photo__container').appendChild(svg);
    })
    
    document.querySelectorAll('.vectorised').forEach(vectorImage=>{
        let container = getContainerSvg(vectorImage);
        container.classList.add('vectorised__parent');
        document.querySelector('.vectorised__container').appendChild(container);
    })
    
    
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
        
        
        let distanceFromCentre = distance(x,y,window.innerWidth/2,window.innerHeight/2);
        
        const sineY = 0.1-( Math.abs(Math.sin(relative.y / (relative.range.y*0.8) * Math.PI))* 0.1);
        
        echo.delayTime.rampTo( (distanceFromCentre/window.innerWidth/2)+0.1, 0.9)
       
        
        if (type == 'start' || type == 'enter') {
            player.playbackRate = 0.75;
       
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
            
        } else if (type == 'end' || type == 'leave') {
            player.playbackRate = 1;
            document.querySelectorAll('.beyond1remove,.beyond2remove').forEach(x=>x.style.filter='sepia(0%) hue-rotate(220deg)')
            interpolateStates(0.1);
            echo.wet.rampTo(0, 0.1);
            
            document.querySelectorAll('.bridge__sky').forEach(sky=>{
                sky.style.opacity=0;
            });
            
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
            player2.volume.rampTo(-50,10);
            
        } else if(type=='move'){
            document.querySelectorAll('.bridge__sky').forEach((sky,i)=>{
                if(Math.random()>0.8){
                    sky.style.opacity=Math.abs(e.detail.iterations%(i+2)/(i+2));    
                }
                
            })
            if(element.id=='bridge__under')interpolateStates(sineY);
            lpf.frequency.rampTo(10000-(10000*(y/window.innerWidth)),0.1);
            if(element.id == 'bridge__beyond') {
                document.querySelectorAll('.beyond__container').forEach(container => {
                    container.style.opacity = 0.9;
                   
                });
            }
            document.querySelectorAll('.bridge__container').forEach(container => {
                container.style.opacity = 0.9;
                container.style.filter = `brightness(${y/window.innerHeight*20}%)`;
            });

            document.querySelector('.note_1').style.filter=`invert(${x%100}%) sepia(${x%100}%) saturate(4212%) hue-rotate(164deg) brightness(98%) contrast(103%) blur(${Math.abs(Math.sin(y/window.innerHeight/2))*20}px)`
            document.querySelector('.note_1').style.opacity=0.5;
            
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
    
    window.onresize = ()=>{
        const bridgeImageremove = document.querySelector('#bridge_Imageremove');
        const bridgeImageremoveWidth = bridgeImageremove.getBoundingClientRect().width;
        const bridgeImageremoveHeight = bridgeImageremove.getBoundingClientRect().height;
        
        document.querySelectorAll('.bridge__sky').forEach(sky=>{
            sky.setAttribute('width', bridgeImageremoveWidth);
            sky.setAttribute('height', bridgeImageremoveHeight);
           
        })
    }
    window.onresize();
    
    
    
   
    
})

