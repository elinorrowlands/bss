import Pickup from './text_pickup_d3.js';
import generateBlocks from './text_d3_caption.js';
import {elinorCaption} from './elinorCaption.js';

let loadBlinkCount = 0;
const loadBlink = () => {
    document.querySelectorAll('.loadMsg')[0].style.opacity = loadBlinkCount % 2 ? 0.8 : 1;
    document.querySelectorAll('.loading')[0].style.backgroundColor = loadBlinkCount % 2 ? 'navy' : '#0081ff';
    document.querySelectorAll('.loadMsg')[0].style.backgroundColor = loadBlinkCount % 2 ? 'navy' : '#0081ff';
    loadBlinkCount++;
}

setInterval(loadBlink, 5000);

const mix = {
    channel: new Tone.Channel(),
    echo: new Tone.FeedbackDelay(1, 0.9),
    filter: new Tone.Filter(200, 'lowpass').toDestination(),
    player: new Tone.Player('./waters_edge3.mp3').toDestination (),
    backdrop: new Tone.Player('./backdrop.mp3').toDestination(),
}

mix.backdrop.connect(mix.filter);
mix.backdrop.loop = true;
mix.backdrop.volume.value = '-12';
mix.echo.connect(mix.channel);
mix.player.connect(mix.echo);
mix.channel.connect(mix.filter);

const newCaption = elinorCaption;

window.captionObject = syncCC.splitCaptions(newCaption);
window.playFlag = false;

function loaded(){
    StatusVO.update('loaded');
    clearInterval(loadBlink);
    document.querySelectorAll('.loading').forEach(element => {
        element.style.opacity = 0;
        setTimeout(() => {
            element.style.display = 'none';
        }, 1000);
    });
}

window.started = false;

window.start = function(){
    if (window.started) return;
    window.started = true;
    StatusVO.init();
    loaded();
    // placeCaptions(captionObject);
    generateBlocks();
    touch.setAction('.text');
    document.addEventListener('touch-pickup',(e)=>Pickup(e, mix, captionObject));
}

