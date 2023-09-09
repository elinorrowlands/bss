const filter = new Tone.Filter(200, 'lowpass').toDestination();
const echo = new Tone.FeedbackDelay('1n', 0.5).connect(filter);
const player = new Tone.Player('./waters_excerpt.mp3').toDestination();
const backdrop = new Tone.Player('./backdrop.mp3').connect(filter).toDestination();
backdrop.loop = true;
backdrop.volume.value = '-12';
player.connect(echo);

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
Tone.loaded().then(start);


const newCaption = ["00:00:06.420,00:00:08.160\nwhere is the water's edge?", '00:00:11.700,00:00:13.380\nin the wide expanses', '00:00:15.030,00:00:16.950\nor the half filled bathtub', '00:00:19.260,00:00:20.100\nin the river', '00:00:20.580,00:00:21.840\nor the boiling kettle', '00:00:22.770,00:00:23.760\nin the steam', '00:00:23.880,00:00:24.750\nor the snow', '00:00:25.140,00:00:28.170\nor the rainbow mist of a summer hose'];

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
 * Place captions on the screen
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
                start:0.5, enter:0.5, end:1, move:0.5, leave:1
            }
        }
        
        let { element, type, x, y } = e.detail;
        
        let target = element;
        
        let text = captionObject[element.id.split('_')[1]];
        
        if(type == 'start' || type == 'enter'){
            if(!playFlag){
                backdrop.start();
                playFlag = true;
            }
    
            filter.frequency.rampTo((y)+80, 0.5);
            element.classList.add('active');
            document.body.style.filter = `hue-rotate(${element.style.left}deg)`;
            player.start(Tone.now(), text.startS, text.endS-text.startS);
            element.style.left = x+'px';
            element.style.top = y+'px';
            console.log(element.style.top, element.style.left)
            
        } else if (type == 'end' || type == 'leave'){
    
            filter.frequency.rampTo(200, 0.5);
            element.classList.remove('active');
            document.querySelector(`#text_${(element.id.split('_')[1] + 1) % (Object.keys(captionObject).length - 1)}`).style.left = (5+Math.random()*70)+'%';
            document.querySelector(`#text_${(element.id.split('_')[1] + 1) % (Object.keys(captionObject).length - 1)}`).style.top = (5+Math.random()*70)+'%';
            
            document.body.style.filter = `hue-rotate(0deg)`;
    
        } else if(type == 'move'){
    
            document.body.style.filter = `hue-rotate(${element.x}deg)`;
            filter.frequency.rampTo((y)+ 200, 0.5);
            element.style.left = x+'px';
            element.style.top = y+'px';
            document.querySelector(`#text_${(element.id.split('_')[1] + 2) % (Object.keys(captionObject).length - 1)}`).style.left = (5+Math.random()*70)+'%';
            document.querySelector(`#text_${(element.id.split('_')[1] + 2) % (Object.keys(captionObject).length - 1)}`).style.top = (5+Math.random()*70)+'%';
    
        }
        
        target.style.opacity = preset.opacity[type];
    }
    
    document.addEventListener('touch-pickup',(e)=>Pickup(e));
}

