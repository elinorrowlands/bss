let elements = {
    "1": {name:"bridge", folder:"bridge"},
    "2": {name:"water's edge", folder:"text"},
    "3": {name:"crossing", folder:"crossing"},
    "4": {name:"ripples", folder:"ripples"},
    "5": {name:"rusty can", folder:"rusty_can"},
    "6": {name:"school", folder:"school"}
}

function positionNumbers(){
    let qrCodes = document.querySelectorAll('.qr__code');
    document.querySelectorAll('.element__marker').forEach(x=>{
        console.log(x.id);
        let elementName = elements[x.id.split('__')[1]].folder;
        
        // console.log(document.querySelector(`.elements__${elementName}`));
        let qrElement = document.querySelector(`li.elements__${elementName}`);
        let number = document.querySelector(`.${x.id}`);
        x.dataset.number = number.innerHTML;
        let pos=[x.getAttribute('cx'),x.getAttribute('cy')]
            .map(x=>parseInt(x))
        number.setAttribute('transform',`translate(${pos[0]} ${pos[1]+5})`)
        let box = x.getBoundingClientRect();
        qrElement.style.left = `${box.x + window.innerWidth/20}px`;
        if(elementName=='school' || elementName=='rusty_can' || elementName=='crossing') qrElement.style.left = `${box.x - window.innerWidth/10}px`;
        // if(qrElement.style.left.split('px')[0]>window.innerWidth-200) qrElement.style.left = `${box.x - 200}px`;
        // if(qrElement.style.right.split('px')[0]<200) qrElement.style.left = `${box.x + 100}px`;
        qrElement.style.bottom = `${box.y - window.innerWidth/10}px`;
        qrElement.style.position='absolute';
    })
}


const handleMarker = (e)=>{
    let {element, type, id} = e.detail;
    // console.log(elements[element.dataset.number])
    let elementName = elements[id.split('__')[1]].folder;
    let qrElement = document.querySelector(`li.elements__${elementName}`);
    console.log(qrElement)
    // if(type=="end") window.location.href=`elements/${elements[element.dataset.number].folder}/index.html?from=map`;
    if(type=="end") {
        positionNumbers();  
        $(`li.qr__card:not(.elements__${elementName})`).hide()
        $(`li.qr__card.elements__${elementName}`).toggle(100);
    }
}


window.addEventListener('load',()=>{
    $('li.qr__card').hide();
    window.onresize = positionNumbers;
    positionNumbers();
    setTimeout(positionNumbers, 1000);

     window.addEventListener('touch-pickup', handleMarker);
     window.touch.setAction('.element__marker');
     window.touch.listen();
     
    let guide = document.querySelector('.guide path');
    let lengthOfPath = guide.getTotalLength();
    // console.log(lengthOfPath)
    let count = 0;
    for(let i = 0; i < lengthOfPath; i++){
        if(i%10==0){
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", guide.getPointAtLength(i).x);
            circle.setAttribute("cy", guide.getPointAtLength(i).y-5);
            circle.setAttribute("r", 5);
            circle.setAttribute("fill", "red");
            document.querySelector('.guide').appendChild(circle);
            // console.log(count, guide.getPointAtLength(i).x, guide.getPointAtLength(i).y);
            count++;
        }
        
    }
    
     
})