touch.setAction('.meter');
document.addEventListener('touch-pickup',(e)=>{
    let {type, id} = e.detail;
    if(id=='start') return;
    if(type=='start'){
        document.querySelectorAll('.thumb').forEach((thumb)=>{
            thumb.setAttribute('transition',`r 0.1s ease-in-out, x 0.6, y 0.6s ease-in-out`);
        })
        mix.echo.effectReturn.gain.rampTo(1, 0.1);
    } else {
        document.querySelectorAll('.thumb').forEach((thumb)=>{
            thumb.setAttribute('transition',`r 0.1s ease-in-out`);
        })
        mix.echo.effectReturn.gain.rampTo(0.2,1);
    }
    let {x, y, range} = e.detail.relative;
    let value = x / range.x;
    document.querySelector('#crossFader').value = value;
    document.querySelector('#crossFader').dispatchEvent(new Event('input'));

    if(x<10)x=10;
    if(x>range.x)x=range.x - 10;
    if(y<10)y=10;
    if(y>range.y)y=range.y - 10;

    document.querySelectorAll('.thumb').forEach((thumb)=>{
        thumb.setAttribute('cx',x);
        thumb.setAttribute('cy',range.y - y);
    })
    
    let notchValue = 4000 * ((y)/range.y);
    mix.notch.frequency.rampTo(notchValue, 0.1);
    mix.notch.Q.rampTo((20 * ((1-x)/range.x)) + 20, 0.1);
    mix.echo.delayTime.rampTo((0.1 * ((1-y)/range.y)) + 0.5, 0.1);
    document.querySelectorAll('.slider').forEach((slider,i)=>{
        if(i==0){
            slider.setAttribute('width',x);
        } else {
            slider.setAttribute('width',range.x - x);
            slider.setAttribute('x',x);
        }
        
    })
})

document.querySelector('#crossFader').value = 50;
document.querySelector('#crossFader').dispatchEvent(new Event('input'));