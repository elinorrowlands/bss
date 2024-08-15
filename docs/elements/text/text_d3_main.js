import placeCaptions from './text_d3_placeCaptions.js';
import Pickup from './text_pickup_d3.js';
import generateBlocks from './text_d3_caption.js';
import {elinorCaption} from './elinorCaption.js';

let loadBlinkCount = 0;
const loadBlink = () => {
    document.querySelectorAll('.loadMsg')[0].style.opacity=loadBlinkCount%2 ? 0.8:1;
    document.querySelectorAll('.loading')[0].style.backgroundColor=loadBlinkCount%2 ? 'navy':'#0081ff';
    document.querySelectorAll('.loadMsg')[0].style.backgroundColor=loadBlinkCount%2 ? 'navy':'#0081ff';
    loadBlinkCount++;
}

setInterval(loadBlink, 5000);

const mix = {
    filter: new Tone.Filter(200, 'lowpass').toDestination(),
    echo: new Tone.FeedbackDelay(1, 0.9),
    player: new Tone.Player('./waters_edge3.mp3').toDestination (),
    channel: new Tone.Channel(),
    backdrop: new Tone.Player('./backdrop.mp3').toDestination(),
}

mix.backdrop.connect(mix.filter);
mix.backdrop.loop = true;
mix.backdrop.volume.value = '-12';
mix.echo.connect(mix.channel);
mix.player.connect(mix.echo);
mix.channel.connect(mix.filter);

// I reach out towards the water’s edge. 
// The water here is so clear and open and honest
// On the skin of the water, 
// a mirror of the city’s skyline. 
// Under the bridge, a reflection of an otherworld. 
// I reach out for the water’s edge 
// In the steam of my warming tea
// In the mist of deep winters 
// Falling snow, streaming rivers, flooding banks
// I stand and look out to the water’s edge
// Repressed memories, hidden dreams
// Beyond there are the waves of crashing ocean polluted sea.

// const newCaption = [
//     "00:00:00.150,00:00:03.249\nI reach out towards the water's edge.", 
//     "00:00:03.249,00:00:07.161\nThe water here is so clear and open and honest",
//     "00:00:07.161,00:00:08.765\nOn the skin of the water,",
//     "00:00:08.765,00:00:11.286\na mirror of the city's skyline.",
//     "00:00:11.286,00:00:12.422\nUnder the bridge,",
//     "00:00:12.422,00:00:15.072\na reflection of an otherworld.",
//     "00:00:15.072,00:00:16.937\nI reach out for the water's edge",
//     "00:00:16.937,00:00:19.522\nIn the steam of my warming tea",
//     "00:00:19.522,00:00:20.800\nIn the mist of deep winters",
//     "00:00:20.800,00:00:21.986\nFalling snow,",
//     "00:00:21.986,00:00:23.206\nstreaming rivers,",
//     "00:00:23.206,00:00:25.101\nflooding banks",
//     "00:00:25.101,00:00:28.332\nI stand and look out to the water's edge",
//     "00:00:28.332,00:00:29.547\nRepressed memories,",
//     "00:00:29.547,00:00:31.425\nhidden dreams",
//     "00:00:31.425,00:00:33.731\nBeyond there are the waves of crashing ocean",
//     "00:00:33.731,00:00:36.000\npolluted sea."
    
// ];

// testing ideas before integrating properly

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

