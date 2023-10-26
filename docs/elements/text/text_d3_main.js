import placeCaptions from './text_placeCaptions.js';
import Pickup from './text_pickup.js';
import generateBlocks from './generateBlocks.js';

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
    echo: new Tone.FeedbackDelay(1, 0.5),
    player: new Tone.Player('./waters_excerpt.mp3').toDestination(),
    backdrop: new Tone.Player('./backdrop.mp3').toDestination(),
}

mix.backdrop.connect(mix.filter);
mix.backdrop.loop = true;
mix.backdrop.volume.value = '-12';
mix.echo.connect(mix.filter);
mix.player.connect(mix.echo);

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

window.start = function(){
    StatusVO.init();
    loaded();
    placeCaptions(captionObject);
    generateBlocks();
    touch.setAction('.text');
    document.addEventListener('touch-pickup',(e)=>Pickup(e, mix, captionObject));
}

