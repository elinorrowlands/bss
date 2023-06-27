const echo = new Tone.FeedbackDelay('1n', 0.5).toDestination();
const player = new Tone.Player('./waters_excerpt.mp3').toDestination();
player.connect(echo);
const newCaption = ["00:00:06.420,00:00:08.160\nwhere is the water's edge?", '00:00:11.700,00:00:13.380\nin the wide expanses', '00:00:15.030,00:00:16.950\nor the half filled bathtub', '00:00:19.260,00:00:20.100\nin the river', '00:00:20.580,00:00:21.840\nor the boiling kettle', '00:00:22.770,00:00:23.760\nin the steam', '00:00:23.880,00:00:24.750\nor the snow', '00:00:25.140,00:00:28.170\nor the rainbow mist of a summer hose'];
let captionObject = syncCC.splitCaptions(newCaption);
console.log(captionObject);
let justText = captionObject.map(text => text.content[0]);
captionObject.forEach((text,i) => {
    let textElement = document.createElement('div');
    Object.assign(textElement.style,{
        position: 'absolute',
        top: i==0? '45%': (5+Math.random()*80)+'%',
        left: i==0? '45%':(5+Math.random()*70)+'%',
        fontSize: i==0? '50px': (20+Math.random()*30)+'px',
        userSelect: 'none',
        cursor:'pointer'
    })
    textElement.id = `text_${i}`;
    textElement.innerHTML = text.content[0];
    textElement.classList.add('text');
    textElement.addEventListener('click', () => {
        // player.start(Tone.now(), text.startS, text.endS-text.startS);
    })
    captionObject.element = textElement;
    document.body.appendChild(textElement);
});

touch.setAction('.text');
/**
 * For touch listener
 * 
 */

const Pickup = (e) =>{
    const preset = {
        transition:{
            start:0.5, enter:0.5, end:1, move:-1, leave:2
        },
        opacity:{
            start:0.5, enter:0.5, end:1, move:0.5, leave:1
        }
    }
    
    let { element, type, x, y } = e.detail;
    console.log(e.detail)
    //todo: debounce
    let target = element;
    let value = preset.transition[type];
    let text = captionObject[element.id.split('_')[1]];
    
    // if(value>-1){
    //     target.style.transition = `all ${value}s ease`;
    // }
    
    // let id = getNoteFromId(element.id);
    if(type == 'start' || type == 'enter'){
        document.body.style.filter = `hue-rotate(${element.style.left}deg)`;
        player.start(Tone.now(), text.startS, text.endS-text.startS);
        element.style.left = x+'px';
        element.style.top = y+'px';
        console.log(element.style.top, element.style.left)
        // synth.triggerAttack(id);
    } else if (type == 'end' || type == 'leave'){
        
        document.querySelector(`#text_${(element.id.split('_')[1] + 1) % (Object.keys(captionObject).length - 1)}`).style.left = (5+Math.random()*70)+'%';
        document.querySelector(`#text_${(element.id.split('_')[1] + 1) % (Object.keys(captionObject).length - 1)}`).style.top = (5+Math.random()*70)+'%';
        // synth.triggerRelease(id);
        document.body.style.filter = `hue-rotate(0deg)`;
    } else if(type == 'move'){
        document.body.style.filter = `hue-rotate(${element.x}deg)`;
        element.style.left = x+'px';
        element.style.top = y+'px';
    }
    
    target.style.opacity = preset.opacity[type];
}

document.addEventListener('touch-pickup',(e)=>Pickup(e));