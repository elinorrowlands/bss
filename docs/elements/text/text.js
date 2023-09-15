/**
 * Loading screen, to break out later (see loading.js in the source folder)
 */

let loadBlinkCount = 0;
const loadBlink = () => {
    document.querySelectorAll('.loadMsg')[0].style.opacity=loadBlinkCount%2 ? 0.8:1;
    document.querySelectorAll('.loading')[0].style.backgroundColor=loadBlinkCount%2 ? 'navy':'#0081ff';
    document.querySelectorAll('.loadMsg')[0].style.backgroundColor=loadBlinkCount%2 ? 'navy':'#0081ff';
    loadBlinkCount++;
}

setInterval(loadBlink, 5000);

/**
 * All sounds for current page
 */
let mix = {
    filter: new Tone.Filter(200, 'lowpass').toDestination(),
    echo: new Tone.FeedbackDelay(1, 0.5),
    player: new Tone.Player('./waters_excerpt.mp3').toDestination(),
    backdrop: new Tone.Player('./backdrop.mp3').toDestination(),
}

mix.backdrop.connect(mix.filter);
mix.backdrop.loop = true;
mix.backdrop.volume.value = '-12';
mix.echo.connect(mix.filter);
mix.player.connect(mix.echo);



Tone.loaded().then(start);

const newCaption = [
    "00:00:06.420,00:00:08.160\nwhere is the water's edge?", 
    '00:00:11.700,00:00:13.380\nin the wide expanses?', 
    '00:00:15.030,00:00:16.950\nor the half filled bathtub?', 
    '00:00:19.260,00:00:20.100\nin the river?', 
    '00:00:20.580,00:00:21.840\nor the boiling kettle?', 
    '00:00:22.770,00:00:23.760\nin the steam?', 
    '00:00:23.880,00:00:24.750\nor the snow?', 
    '00:00:25.140,00:00:28.170\nor the rainbow mist of a summer hose?'
];

let captionObject = syncCC.splitCaptions(newCaption);
let playFlag = false;

function loaded(){
        // todo: add load status message for screen readers
        document.querySelectorAll('.loading').forEach(element => {
            clearInterval(loadBlink);
            element.style.opacity = 0;
            setTimeout(() => {
                element.style.display = 'none';
            }, 1000);
        });
}

/**
 * Place captions on the screen in random positions
 * @param {Object} captionObject 
 */

function placeCaptions(captionObject){
    captionObject.forEach((text,i) => {
        let textElement = document.createElement('div');
        let colourValue = ((12+i)*10)+(Math.random()*(255-((12+i)*10)));
    
        Object.assign(textElement.style,{
            position: 'absolute',
            top: i==0 ? '45%': (5+Math.random()*80)+'%',
            left: i==0 ? '5%':(5+Math.random()*70)+'%',
            fontSize: i==0 ? '50px': (20+Math.random()*30)+'px',
            userSelect: 'none',
            cursor:'pointer',
            color:`rgba(${colourValue},${colourValue},${colourValue},1)`,
            opacity: i==0 ? 1:0.1
        });
        
        textElement.id = `text_${i}`;
        textElement.innerHTML = text.content[0];
        textElement.classList.add('text');
    
        captionObject.element = textElement;
        document.body.appendChild(textElement);
    });
}

function start(){
    loaded();
    placeCaptions(captionObject);
    
    touch.setAction('.text');
    
    const Pickup = (e) =>{
        
        const preset = {
            opacity:{
                start:0.7, enter:0.7, end:1, move:0.9, leave:1, cancel:0.5
            }
        }
        
        let { element, type, x, y } = e.detail;
        if(element.classList.contains('allowDefault'))return;
        let target = element;
        
        let text = captionObject[element.id.split('_')[1]];
        
        if(type == 'start' || type == 'enter'){
            if(!playFlag){
                mix.backdrop.start();
                playFlag = true;
            }
    
            mix.filter.frequency.rampTo((y)+80, 0.5);
            element.classList.add('active');
            document.body.style.filter = `hue-rotate(${element.style.left}deg)`;
            mix.player.start(Tone.now(), text.startS, text.endS-text.startS);
            element.style.left = x+'px';
            element.style.top = y+'px';
            element.style.textShadow = `0px 5px 3px rgba(0,0,0,1)`;
            element.style.backgroundColor = `rgba(0,0,128,0.5)`;
            
            // if(!element.style.transition){
            //     element.style.transition = 'all 1s, left 18.5s ease-in-out, top 16.5s ease-in-out, opacity 0.5s ease-in-out';
            // }
            // element.style.transition = element.style.transition.split(', ').map((t)=>{
            //     if(t.includes('top') || t.includes('left')){
            //         return '0.1s';
            //     }
            //     return t;
            // }).join(', ');
            
            
        } else if (type == 'end' || type == 'leave'){
            element.style.transition = element.style.transition.split(', ').map((t)=>{
                if(t.includes('top') || t.includes('left')){
                    return '18s';
                }
                return t;
            }).join(', ');
            mix.filter.frequency.rampTo(200, 1);
            element.classList.remove('active');
            document.querySelector(`#text_${(element.id.split('_')[1] + 1) % (Object.keys(captionObject).length - 1)}`).style.left = (5+Math.random()*70)+'%';
            document.querySelector(`#text_${(element.id.split('_')[1] + 1) % (Object.keys(captionObject).length - 1)}`).style.top = (5+Math.random()*70)+'%';
            element.style.textShadow = `0px 0px 10px rgba(0,0,128,0.4)`;
            document.body.style.filter = `hue-rotate(0deg)`;
            element.style.backgroundColor = `transparent`;
    
        } else if(type == 'move'){
    
            document.body.style.filter = `hue-rotate(${element.x}deg)`;
            mix.filter.frequency.rampTo((y)+ 500, 0.5);
            element.style.left = x+'px';
            element.style.top = y+'px';
            document.querySelector(`#text_${(element.id.split('_')[1] + 2) % (Object.keys(captionObject).length - 1)}`).style.left = (5+Math.random()*70)+'%';
            document.querySelector(`#text_${(element.id.split('_')[1] + 2) % (Object.keys(captionObject).length - 1)}`).style.top = (5+Math.random()*70)+'%';
            element.style.textShadow = `0px 0px 10px rgba(0,0,0,${(y/100)})`;
        }
        
        target.style.opacity = preset.opacity[type];
        window.setInterval(()=>{
            target.style.opacity = preset.opacity.cancel;
        }
        ,4000);
        
    }
    
    document.addEventListener('touch-pickup',(e)=>Pickup(e));
}

