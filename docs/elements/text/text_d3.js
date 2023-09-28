// let   w = 1000,
//       h =  800,
//       circleWidth = 5; 
 
let textInput = 'the quick brown fox jumps over the lazy dog';
textInput = textInput.split(' ');

textInput= 
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

let container = d3.select('body')
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
    // .append('g') 

// item.append('svg')
//     .attr("preserveAspectRatio", "xMinYMin meet")
//     .attr("viewBox", (d,i)=>{
//         let dim = circleWidth + d.size;
//         return `0 0 ${dim} ${dim}`
//     })
//     .attr("position", "absolute")
//     .attr('top', d=>d.x)
//     .attr('left', d=>d.y)
//     .append('circle')
//     .attr(cx,(d,i)=>{
//         let dim = circleWidth + d.size;
//         return dim
//     })
//     .attr('r', (d,i)=>{
//         let dim = circleWidth + d.size;
//         return dim
//     })
//     .classed('transparent', true)
//     .classed('words', true)
          
   // setInterval(function(){force.alpha(Math.random());},1250);

   // setInterval(()=>{force.alpha(0.01)},250);

   window.addEventListener('bump', () => {
    // console.log('bump')
    force.alpha(0.5);
    });
      
force.on('tick', function(e){ 
    // item.attr('transform', function(d, i){
    //     return 'translate(' + d.x + ','+ d.y + ')'
    // })
    item.style('top', d=>{return `${parseInt(d.y)}px`})
        .style('left', d=>{return `${parseInt(d.x)}px`})
        // .style('font-size', d=>{return `${(d.y/window.innerHeight*30)+10}px`})
        // .style('font-size', d=>{return `${d.size * 1.5}px`})
});


item.append('div')
    .text(d=>d.name)
    // .classed('5ords', true)
    // .classed('text', true)

force.start();


