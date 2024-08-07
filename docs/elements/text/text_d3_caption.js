export default function generateBlocks(text){
        
    /**
     * combine with text.js
     */

    window.textInput = 
        `where is the water's edge?\nin the wide expanses\nor the half filled bathtub\nin the river\nor the boiling kettle\nin the steam\nor the snow\nor the rainbow mist of a summer hose`
            .split('\n');
    function removeDuplicates(textInput){
        let unique = {};
        textInput.forEach((entry,i)=>{
            unique[entry] = i;
        })
        return Object.keys(unique);
    }
    
    textInput = removeDuplicates(textInput);

    // console.log('textInput', textInput)
            
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

    document.querySelectorAll('.wordContainer').forEach((element,i) => {
    // window.captionObject[]
    })

    let force = d3.layout.force()
    .nodes(items)
    .gravity(0.01)
    .charge(-300)
    .size([window.innerWidth*0.75,window.innerHeight*0.75]); 

    let item = container.selectAll('wordContainer') 
        .data(items).enter() 
        .append('div')
        .classed('words', true)
        .classed('text', true)
        .classed('moving', true)
        .classed('d3', true)
        // .style('top', '0px')
        .call(force.drag); 
    
    document.querySelectorAll('.words.text.d3').forEach((element,i) => {
        element.id = `text_${i}`;
        // element.style.top = `${i/items.length*window.innerHeight/2}px`;
        // element.style.left = `10px`
    })
    window.gravity=0.01
    window.addEventListener('bump', (e) => {
        // was 0.5
        let {value} = e.detail; 
        force.alpha(value);
        force.charge(-1000*value);
        window.gravity+=0.001;
        if(window.gravity>0.1) window.gravity=0.01;
        // console.log('gravity', window.gravity)
        force.gravity(window.gravity)
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
            return `${parseInt(y)}px`
        })
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
        // .style('top', '0px')
    // .classed('words', true)
    // .classed('text', true)

    force.start();
}


// export default generateBlocks;
