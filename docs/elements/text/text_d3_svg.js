let   w = 1000,
      h =  800,
      circleWidth = 5; 
 
let textInput = 'the quick brown fox jumps over the lazy dog';
textInput = textInput.split(' ');

let items = [];
textInput.forEach((entry,i)=>{
    items.push({
        name: entry,
        size: 5 + entry.length*3
    })
})

let svgElement = d3.select('body')
    .append("div")
    .classed("svg-container", true)
    

let force = d3.layout.force()
    .nodes(items)
    .gravity(0.5)
    .charge(-1000)
    .size([window.innerWidth,window.innerHeight]); 

let item = svgElement.selectAll('circle') 
    .data(items).enter() 
    .append('g') 
    .call(force.drag); 

item.append('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", (d,i)=>{
        let dim = circleWidth + d.size;
        return `0 0 ${dim} ${dim}`
    })
    .attr("position", "absolute")
    .attr('top', d=>d.x)
    .attr('left', d=>d.y)
    .append('circle')
    .attr(cx,(d,i)=>{
        let dim = circleWidth + d.size;
        return dim
    })
    .attr('r', (d,i)=>{
        let dim = circleWidth + d.size;
        return dim
    })
    .classed('transparent', true)
    .classed('words', true)
          
   // setInterval(function(){force.alpha(Math.random());},1250);
setInterval(()=>{force.alpha(0.01)},250);

      
force.on('tick', (e)=>{ 
    item.attr('transform', function(d, i){
        return 'translate(' + d.x + ','+ d.y + ')'
    })
});


item.append('text')
    .text(d=>d.name)
    .classed('words', true)
    .classed('text', true)

force.start();


