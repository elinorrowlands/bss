export default function generateBlocks(text){
        
    /**
     * combine with text.js
     */

    
    window.textInput = "I reach out towards the water's edge.\nThe water here is so clear and open and honest\nOn the skin of the water,\na mirror of the city’s skyline.\nUnder the bridge, a reflection of an otherworld.\nI reach out for the water’s edge\nIn the steam of my warming tea\nIn the mist of deep winters\nFalling snow, streaming rivers, flooding banks\nI stand and look out to the water’s edge\nRepressed memories, hidden dreams\nBeyond there are the waves of crashing ocean polluted sea.".split('\n');
    
    
    function removeDuplicates(textInput){
        let unique = {};
        textInput.forEach((entry,i)=>{
            unique[entry] = i;
        })
        return Object.keys(unique);
    }
    
    textInput = removeDuplicates(textInput);
            
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
        .style('top', (d, i) => {
            let targetY = (i / items.length) * window.innerHeight;
            return `${targetY}px`;
        })
        .style('left', '0px')
        // .style('top', '0px')
        .call(force.drag); 
    
        item.each(function (d, i) {
            let targetY = (i / items.length) * window.innerHeight;
            let currentY = parseFloat(this.style.top) || 0;
            let newY = currentY + (targetY - currentY) * 0.1; // Adjust the 0.1 factor to control the speed of movement
            this.style.top = `${newY}px`;
        });
        
    document.querySelectorAll('.words.text.d3').forEach((element,i) => {
        element.id = `text_${i}`;
        // element.style.top = `${i/items.length*window.innerHeight/2}px`;
        // element.style.left = `10px`
    })
    window.gravity=0.01
    window.addEventListener('bump', (e) => {
        // was 0.5
        let {value} = e.detail; 
        // place the elements on y axis according to their order in the poem

        force.alpha(value);
        force.charge(-1000*value);
        window.gravity+=0.001;
        if(window.gravity>0.002) window.gravity=0.01;
        // console.log('gravity', window.gravity)
        force.gravity(window.gravity)
        if(window.rippleScene){
            rippleScene.ripples.mouse.velocity = {x:1, y:1};
        }
        // set all elements color to a random shade of light blue (random, random, 128, 0.5)
        // document.querySelectorAll('.words.text.d3').forEach((element,i) => {
        //     let redGreen = Math.floor(55+Math.random()*200);
        //     element.style.color = `rgba(${redGreen},${redGreen},255,0.5)`;
        // })
        
    });
    
    // let tickCount = 0;
    
    force.on('tick', function(e){ 
        items.forEach((a, i) => {
            items.slice(i + 1).forEach(b => {
                let dx = a.x - b.x;
                let dy = a.y - b.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let minDistance = (a.size / 2) + (b.size / 2) + 5; // Add padding
    
                if (distance < minDistance) {
                    let angle = Math.atan2(dy, dx);
                    let moveDistance = (minDistance - distance) / 2;
                    let moveX = Math.cos(angle) * moveDistance;
                    let moveY = Math.sin(angle) * moveDistance;
    
                    a.x += moveX;
                    a.y += moveY;
                    b.x -= moveX;
                    b.y -= moveY;
                }
            });
        });
    
        item.style('top', (d, i) => {
            let targetY = (i / items.length) * window.innerHeight;
            let currentY = parseFloat(d.y) || 0;
            let newY = currentY + (targetY - currentY) * 0.1; // would need more consideration to implement
    
            if (newY > window.innerHeight - 50) newY = window.innerHeight - 50;
            if (newY < 50) newY = 50;
            return `${parseInt(newY)}px`;
        })
        .style('left', d => {
            let x = d.x;
            if (x > window.innerWidth - 250) x = window.innerWidth - 250;
            if (x < 50) x = 50;
            return `${parseInt(x)}px`;
        });
    });


    item.append('span')
        .text(d=>d.name)

        
    
    force.start();
}


// export default generateBlocks;
