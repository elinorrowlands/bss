window.addEventListener('load', ()=>{
    
    document.querySelectorAll('svg image').forEach((e,i)=>{
        if(i>0){
          e.id =`note_${i-1}`;
          e.style.transformOrigin = 'center center';
          e.parentElement.classList.add('pickup');
          
          e.parentElement.querySelectorAll(`[id$='_hc']`).forEach((x)=>{
            x.querySelectorAll('path').forEach((y,j)=>{
              y.classList.add('visual');
              y.id = `note_${i-1}_hc_${j}`;
              y.style.opacity=0;
            })
          })
      
        } else {
          e.style.opacity=0;
        }
      })
    assignClasses(document.querySelector('svg'), true, true);
})