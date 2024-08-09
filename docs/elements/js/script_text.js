// ripples based on code by Martin Laxenaire via codepen.io
import RipplesScene from './ripplesScene.js'
import ramps from './tone_ramps.js';

let mouseX = 0;
let started = false;
let moused = false;
let bgAnimation;
let count = 0;
var paintingFlag = false;
window.addEventListener("load", () => {
    if(!window.rippleScene){
        window.rippleScene = new RipplesScene({
            viscosity: 5,
            speed: 8,
            size: 0.75,
            displacementStrength: 1.5,
            lightIntensity: 5,
            shadowIntensity: 2.5,
        });  
        rippleScene.gui.hide();    
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key == "g") {
        rippleScene.gui.show();
    } else if (e.key == "h"){
        rippleScene.gui.hide();
    }
    if(e.key == "a"){
        // rippleScene.ripples.ripples.uniforms.viscosity.value = rippleScene.ripples.ripples.uniforms.viscosity.value == 5 ? 1 : 5;
        // window.verbose = !window.verbose;
        
    }
});

function setBGAnimation(){
    bgAnimation = setInterval( () => {
        
        count++;
        let hueElement = document.querySelector('main');
        let canvasElement = document.querySelector('canvas');
        if(moused){
            let hue = mouseX;
            hueElement.style.filter = `hue-rotate(${hue}deg) brightness(100%)`
            if(canvaseElement) canvasElement.style.filter = `hue-rotate(${-hue}deg) brightness(100%)`
        } else {
            hueElement.style.filter = `hue-rotate(0deg)`    
            if(canvasElement) canvasElement.style.filter = `hue-rotate(0deg)`
        }
        
        let level = Tone.dbToGain(sounds.meter.getValue()*4)
        let echoGain = Tone.dbToGain(sounds.echoMeter.getValue())*2;

        if(moused&&paintingFlag){
            $('#note_0').css('transform', `scale(${1 + level*2})`);
            $('#note_2').css('transform', `scale(${1 + level*2.1})`);
            $('#note_1').css('transform', `scale(${1 + level*(moused?5:1)})`);
        }
        
        
    }, 100)
}

setBGAnimation();

Tone.start();

window.sounds = {
    loop: new Tone.Player("ripple1.mp3"),
    filter: new Tone.Filter(200, "lowpass"),
    echo: new Tone.FeedbackDelay("2n", 0.5).toMaster(),
    meter: new Tone.Meter(),
    echoMeter: new Tone.Meter()
}

sounds.echo.wet.value = 1;
sounds.loop.connect(sounds.filter);
sounds.loop.volume.value=-Infinity;
sounds.filter.toMaster();
sounds.filter.connect(sounds.meter);
sounds.echo.connect(sounds.echoMeter);

function opacities(value){
    document.querySelector('#note_1').style.opacity = value ? 0.1 : 0.9;
    document.querySelectorAll('#note_0, #note_2').forEach(x=>{
        x.style.opacity = value ? 0.7 : 1;
    });
}