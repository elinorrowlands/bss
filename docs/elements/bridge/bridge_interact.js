document.querySelectorAll('image').forEach((x,i)=>{
    if(i%2===0) return;
    x.style.filter=`invert(${i*2}%) sepia(${i*2%100}%) saturate(4212%) hue-rotate(164deg) brightness(98%) contrast(103%)`
})

touch.setAction('.interact');

window.addEventListener('touch-pickup',e=>{
    let {element, type}=e.detail;
    console.log(e.detail)
    document.querySelectorAll('.vectorised').forEach(vectorImage=>{
        if(type=='start'||type=='enter'){
            vectorImage.style.opacity=0.9;    
        } else if(type=='end'||type=='leave'){
            vectorImage.style.opacity=0.1;
        }
        
    })
})