import loader from '../loader.js'

window.addEventListener('load',()=>{
    document.querySelectorAll('#Group_2 path').forEach((x,i)=>{
        x.classList.add('interact')
        x.classList.add('path')
        x.id=`water${i}`
    })
    
    loader();
})

