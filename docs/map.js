 window.addEventListener('load',()=>{
     window.addEventListener('touch-pickup',(e)=>{console.log(e.detail)});
     window.touch.setAction('.element__marker');
     window.touch.listen();
})