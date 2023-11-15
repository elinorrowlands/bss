window.addEventListener('load', () => {
    
    let guide = document.querySelector('.guide path');
    let lengthOfPath = guide.getTotalLength();
    console.log(lengthOfPath)
    let count = 0;
    let positions = {start:1045, end:1750}
    for(let i = 0; i < lengthOfPath; i++){
        if(i%5==0&&i>positions.start && i<positions.end){
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", guide.getPointAtLength(i).x);
            circle.setAttribute("cy", guide.getPointAtLength(i).y-5);
            circle.setAttribute("r", Math.abs(Math.sin((i/20)+0.4)*5)+5);
            circle.setAttribute("id", `${count}_${i}`);
            circle.setAttribute("stroke", `rgba(${count%255}, 0, 255, 0.4)`);
            circle.classList.add('guide__circle');
            document.querySelector('.guide').appendChild(circle);
            console.log(count, guide.getPointAtLength(i).x, guide.getPointAtLength(i).y);
            count++;
        }
        
    }
    
    var iframeElement   = document.querySelector('iframe');
    // var iframeElementID = iframeElement.id;
    window.widget       = SC.Widget(iframeElement);
    
    setInterval(function(){ 
                widget.getPosition(function(position) {
                    
                        widget.getDuration(function(duration) {
                            percent = position * 100 / duration;
                        //   console.log(position, percent);
                        let length = (positions.end-positions.start);
                            document.querySelector('#cursor_back').setAttribute('transform',`translate(${guide.getPointAtLength(positions.start+(percent/100*length)).x} ${guide.getPointAtLength(positions.start+(percent/100*length)).y})`)
                            document.querySelector('#cursor').setAttribute('transform',`translate(${guide.getPointAtLength(positions.start+(percent/100*length)).x} ${guide.getPointAtLength(positions.start+(percent/100*length)).y})`)
                            document.querySelectorAll('.guide circle').forEach((x,i)=>{
                                if(percent/100*count>=i){
                                        // console.log(x)
                                        x.classList.add('on')
                                } else {
                                        x.classList.remove('on')
                                }
                            })
        });
       })
    },500); //Interval in ms  
    
});

