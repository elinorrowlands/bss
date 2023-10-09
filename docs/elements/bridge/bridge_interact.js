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
        // container.style.filter=`invert(${i*2}%) sepia(${i*2%100}%) saturate(4212%) hue-rotate(164deg) brightness(98%) contrast(103%)`
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
    
    document.querySelectorAll('.beyond.photo').forEach(vectorImage=>{
        let container = getContainerSvg(vectorImage);
        container.classList.add('beyond__parent');
        document.querySelector('.beyond__container').appendChild(container);
    })
    
    document.querySelectorAll('.vectorised.bridge__foreground').forEach(vectorImage=>{
        let container = getContainerSvg(vectorImage);
        container.classList.add('vectorised__parent');
        document.querySelector('.bridge__container').appendChild(container);
    })
    
    document.querySelector('main').appendChild(document.querySelector('.beyond__container'));
    document.querySelector('main').appendChild(document.querySelector('.vectorised__container'));
    document.querySelector('main').appendChild(document.querySelector('.bridge__container'));
    document.querySelector('main').replaceWith(document.querySelector('main'))
    
    touch.setAction('.interact');
    
    window.addEventListener('touch-pickup', e => {
        let { element, type, x,y } = e.detail;

        if (type == 'start' || type == 'enter') {
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
            if(element.id == 'bridge__beyond') {
                document.querySelectorAll('.beyond__container').forEach(container => {
                    container.style.opacity = 0.9;
                    container.style.filter = 'sepia(100%)';
                });
            }
        } else if (type == 'end' || type == 'leave') {
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
            if(element.id == 'bridge__beyond') {
                document.querySelectorAll('.beyond__container').forEach(container => {
                    container.style.opacity = 0.9;
                    container.style.filter = 'sepia(0%)';
                });
            }
        } else if(type=='move'){
            if(element.id == 'bridge__beyond') {
                document.querySelectorAll('.beyond__container').forEach(container => {
                    container.style.opacity = 0.9;
                    container.style.filter = 'sepia(100%)';
                });
            }
            console.log('move',x,y, e.detail)
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
    
})

