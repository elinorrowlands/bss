const linked = true;
const links = ['bridge','ripples','circle','text','mix','heart'];

const markers = JSON.parse(localStorage.getItem('markers')) || {
    elements: { 
        "circle_0": { "cx": 119.71634076955372, "cy": 484.0905827769419 }, 
        "circle_1": { "cx": 317.2495086860942, "cy": 572.643804075891 }, 
        "circle_2": { "cx": 618.3049498527275, "cy": 558.4834872089119 }, 
        "circle_3": { "cx": 838.6911389349964, "cy": 440.7490527601186 }, 
        "circle_4": { "cx": 1187.6359383152555, "cy": 458.8620426753175 } }
}

if(!localStorage.getItem('markers')){
    localStorage.setItem('markers', JSON.stringify(markers));
}

window.gui = typeof dat != 'undefined' ? new dat.GUI() : {
    add:()=>{}, 
    addFolder:()=>{}, 
    open:()=>{}, 
    close:()=>{}, 
    hide:()=>{}, 
    show:()=>{}
};

let circleObject = {
    main:document.querySelector('#circle_0'),
    centre:document.querySelector('#circle_0_centre'),
    centre2:document.querySelector('#circle_0_centre2'),
    halo:document.querySelector('#circle_0_halo'),
}

/**
 * @class CircleMarker
 * @description Duplicate SVG elements to create interactive circles
 * @param {Number} cx - x coordinate of circle
 * @param {Number} cy - y coordinate of circle
 * @param {Number} index - index of circle
 * 
 */
class CircleMarker{
    constructor(cx = 100, cy = 100, index = 0){
        this.cx = cx;
        this.cy = cy;

        this.elements = {
            main:circleObject.main.cloneNode(),
            centre:circleObject.centre.cloneNode(),
            centre2:circleObject.centre2.cloneNode(),
            halo:circleObject.halo.cloneNode()
        }

        Object.values(this.elements).forEach((element)=>{
            element.setAttribute('cx', cx);
            element.setAttribute('cy', cy);
            element.id = element.id.replace('0',index)
            element.dataset.id = element.dataset.id.replace('0',index)
        })

        document.querySelector('#circles').appendChild(this.elements.halo);
        document.querySelector('#circles_interact').appendChild(this.elements.main);
        document.querySelector('#circles_centres_outer').appendChild(this.elements.centre);
        document.querySelector('#circles_centres').appendChild(this.elements.centre2);
        Object.assign(this.elements, this);
    }
}

let circleMarkers = [circleObject];
let positionFolder = gui.addFolder('positions');
let elementFolders = [positionFolder.addFolder('element 1')];

let parameters = {
    marker_0_cx: elementFolders[0].add(markers.elements.circle_0, 'cx', 0, 1600),
    marker_0_cy: elementFolders[0].add(markers.elements.circle_0, 'cy', 0, 789),
}

for(let i=0; i<4; i++){
    circleMarkers.push(new CircleMarker(100,100,i+1));
    elementFolders.push(positionFolder.addFolder(`element ${i+2}`))
    parameters[`marker_${i+1}_cx`] = elementFolders[i+1].add(markers.elements[`circle_${i+1}`], 'cx', 0, 1600);
    parameters[`marker_${i+1}_cy`] = elementFolders[i+1].add(markers.elements[`circle_${i+1}`], 'cy', 0, 789);
}



function setLS(){
    localStorage.setItem('markers', JSON.stringify(markers));
}

function getLS(){
    let markers = JSON.parse(localStorage.getItem('markers'));
    if(markers){
        Object.entries(markers.elements).forEach(([key, value],i) => {
            document.querySelectorAll(`#circle_${i},#circle_${i}_centre,#circle_${i}_centre2, #circle_${i}_halo`).forEach((circle)=>{
                circle.setAttribute('cx', value.cx);
                circle.setAttribute('cy', value.cy);
            })
        })
    }
}

let numberOfCircles = 5;
for(let i=0; i<numberOfCircles;i++){
    parameters[`marker_${i}_cx`].onChange((value)=>{
        document.querySelectorAll(`#circle_${i},#circle_${i}_centre,#circle_${i}_centre2, #circle_${i}_halo`).forEach((circle)=>{
            circle.setAttribute('cx', value);
        })
    })
    parameters[`marker_${i}_cy`].onChange((value)=>{
        document.querySelectorAll(`#circle_${i},#circle_${i}_centre,#circle_${i}_centre2, #circle_${i}_halo`).forEach((circle)=>{
            circle.setAttribute('cy', value);
        })
    })
}

function mapLoad(){
    
        gui.add({get:getLS}, 'get')
        gui.add({save:setLS}, 'save');

        touch.depth=2;

        touch.setAction('.visual',{
            start:function(element,e,obj){
            },
            enter:function(element,e,obj){
            },
            move:function(element,e,obj){
                let {x,y} = obj.relative;
                let {max_x, max_y} = obj.relative.range;
            },
            end:function(element,e,obj){
            },
            leave:function(element,e,obj){
            }
        })
    
        function startInteraction(element, e, obj){
            let {id} = element;
            let halo = document.querySelector(`.circle_halo[data-id="${id}"]`);
            // halo.classList.add('active');
            
            halo.style.transition='opacity 0.1s'
            halo.style.opacity = 0.2;
            // document.querySelector('#backdrop').classList.add('interacting');
            if(linked){
               window.location.href = `elements/${links[id.replace('circle_','')]}/?from=map`;
            }
        }
    
        function endInteraction(element, e, obj){
            let {id} = element;
            let halo = document.querySelector(`.circle_halo[data-id="${id}"]`);
            // halo.classList.remove('active');
            halo.style.transition='opacity 0.5s'
            halo.style.opacity=0.5;
            // document.querySelector('#backdrop').classList.remove('interacting');
        }
    
        touch.setAction('.circle_interact',{
            start:function(element,e,obj){
                startInteraction(element, e, obj);
                
            },
            enter:function(element,e,obj){
                let {id} = element;
                startInteraction(element, e, obj);
            },
            move:function(element,e,obj){
                let {id} = element;
                let {x,y} = obj.relative;
                let {max_x, max_y} = obj.relative.range;
                
            },
            end:function(element,e,obj){
                endInteraction(element, e, obj);
            },
            leave:function(element,e,obj){
                endInteraction(element, e, obj);
            }
        })
    
        getLS();
        const params = new URLSearchParams(location.search);
        if(!params.has('edit'))gui.hide();
   
}

export {mapLoad};