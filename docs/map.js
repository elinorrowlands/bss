function positionNumbers(){
    document.querySelectorAll('.element__marker').forEach(x=>{
        let number = document.querySelector(`.${x.id}`);
        x.dataset.number = number.innerHTML;
        let pos=[x.getAttribute('cx'),x.getAttribute('cy')]
            .map(x=>parseInt(x))
        number.setAttribute('transform',`translate(${pos[0]} ${pos[1]+5})`)
    })
}

let elements = {
    "1": {name:"bridge", folder:"bridge"},
    "2": {name:"water's edge", folder:"text"},
    "3": {name:"crossing", folder:"crossing"},
    "4": {name:"ripples", folder:"ripples"},
    "5": {name:"rusty can", folder:"rusty_can"},
    "6": {name:"school", folder:"school"}
}

const handleMarker = (e)=>{
    let {element, type} = e.detail;
    // console.log(elements[element.dataset.number])
    if(type=="end") window.location.href=`elements/${elements[element.dataset.number].folder}/index.html?from=map`;
}


window.addEventListener('load',()=>{
    
    positionNumbers();
    
     window.addEventListener('touch-pickup', handleMarker);
     window.touch.setAction('.element__marker');
     window.touch.listen();
     
        let guide = document.querySelector('.guide path');
        let lengthOfPath = guide.getTotalLength();
        console.log(lengthOfPath)
        let count = 0;
        for(let i = 0; i < lengthOfPath; i++){
            if(i%10==0){
                let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", guide.getPointAtLength(i).x);
                circle.setAttribute("cy", guide.getPointAtLength(i).y-5);
                circle.setAttribute("r", 5);
                circle.setAttribute("fill", "red");
                document.querySelector('.guide').appendChild(circle);
                console.log(count, guide.getPointAtLength(i).x, guide.getPointAtLength(i).y);
                count++;
            }
            
        }
    
     
})