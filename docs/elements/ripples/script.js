// ripples based on code by Martin Laxenaire via codepen.io
import RipplesScene from './ripplesScene.js'
import ramps from './tone_ramps.js';

let mouseX = 0;
let started = false;
let moused = false;
let bgAnimation;
let count = 0;
window.addEventListener("load", () => {
    if(!window.rippleScene){
        window.rippleScene = new RipplesScene({
            viscosity: 2.7,
            speed: 1.6,
            size: 0.5,
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
});

function setBGAnimation(){
    bgAnimation = setInterval( () => {
        
        count++;
        
        if(moused){
            let hue = mouseX;
            document.body.style.filter = `hue-rotate(${hue}deg) brightness(100%)`
        } else {
            document.body.style.filter = `hue-rotate(0deg)`    
        }
        
        let level = Tone.dbToGain(sounds.meter.getLevel())
        let echoGain = Tone.dbToGain(sounds.echoMeter.getLevel())*2;

        if(moused){
            // $('#note_0').css('transform', `scale(${1 + level*2})`);
            // $('#note_2').css('transform', `scale(${1 + level*2.1})`);
            // $('#note_1').css('transform', `scale(${1 + level*(moused?5:1)})`);
        }
        
        
    }, 100)
}

setBGAnimation();

Tone.start();

window.sounds = {
    loop: new Tone.Player("ripple1.mp3"),
    filter: new Tone.Filter(200, "lowpass"),
    hpf: new Tone.Filter(400, "highpass"),
    echo: new Tone.FeedbackDelay("2n", 0.5).toMaster(),
    meter: new Tone.Meter(),
    echoMeter: new Tone.Meter()
}

sounds.echo.wet.value = 1;
sounds.loop.connect(sounds.filter);
sounds.filter.connect(sounds.hpf);
sounds.filter.toMaster();
sounds.hpf.connect(sounds.echo);
sounds.filter.connect(sounds.meter);
sounds.echo.connect(sounds.echoMeter);

function opacities(value){
    document.querySelector('#note_1').style.opacity = value ? 0.1 : 0.9;
    document.querySelectorAll('#note_0, #note_2').forEach(x=>{
        x.style.opacity = value ? 0.7 : 1;
    })
}