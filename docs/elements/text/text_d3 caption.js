/**
 * combine with text.js
 */

let textInput= 
    `where is the water's edge? 
    \nin the wide expanses? 
    \nor the half filled bathtub? 
    \nin the river? 
    \nor the boiling kettle?
    \nin the steam? 
    \nor the snow?
    \nor the rainbow mist of a summer hose?`.split('\n');

let items = [];
textInput.forEach((entry,i)=>{
    items.push({
        name: entry,
        size: 5 + entry.length*3
    })
})

let container = d3.select('main')
    .append("div")
    .classed("wordContainer", true)
    

let force = d3.layout.force()
    .nodes(items)
    .gravity(0.1)
    .charge(-1000)
    .size([window.innerWidth*0.75,window.innerHeight*0.75]); 

let item = container.selectAll('wordContainer') 
    .data(items).enter() 
    .append('div')
    .classed('words', true)
    .classed('text', true)
    .classed('moving', true)
    .call(force.drag); 
          
   
   window.addEventListener('bump', (e) => {
    // was 0.5
    let {value} = e.detail; 
    force.alpha(value);
    force.charge(-1000*value);
    if(window.rippleScene){
        rippleScene.ripples.mouse.velocity = {x:1, y:1};
    }
    });
      
force.on('tick', function(e){ 
    // item.attr('transform', function(d, i){
    //     return 'translate(' + d.x + ','+ d.y + ')'
    // })
    item.style('top', d=>{
        let y = d.y;
        if(y>window.innerHeight-50) y = window.innerHeight-50;
        if(y<50) y = 50;
        return `${parseInt(y)}px`})
        .style('left', d=>{
            let x = d.x;
            if(x>window.innerWidth-250) x = window.innerWidth-250;
            if(x<50) x = 50;
            return `${parseInt(x)}px`})
        // .style('font-size', d=>{return `${(d.y/window.innerHeight*30)+10}px`})
        // .style('font-size', d=>{return `${d.size * 1.5}px`})
});


item.append('span')
    .text(d=>d.name)
    // .classed('words', true)
    // .classed('text', true)

force.start();


