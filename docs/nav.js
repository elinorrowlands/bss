window.addEventListener('load', ()=>{
    console.log('loaded')
            //- document.querySelector('.highlight').scrollIntoView();
            document.querySelectorAll('.nav__back').forEach((el)=>{
                // console.log(el)
                el.addEventListener('click', ()=>{
                    window.location.href="index.html";
                })
            })
        })