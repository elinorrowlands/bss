document.querySelectorAll('image').forEach((x,i)=>{
    if(i%2===1) return;
    x.style.filter=`invert(${i*2}%) sepia(${i*2%100}%) saturate(4212%) hue-rotate(164deg) brightness(98%) contrast(103%)`
})