const sounds = {
    loop: new Tone.Player("nesting.mp3"),
    meter: new Tone.Meter(),
    filter: new Tone.Filter(200, "lowpass"),
    hpf: new Tone.Filter(400, "highpass"),
    echo: new Tone.FeedbackDelay("2n", 0.5).toMaster(),
    echoMeter: new Tone.Meter()
}

let moused = false;

sounds.echo.wet.value = 1;
sounds.loop.connect(sounds.filter);
sounds.filter.toMaster();
sounds.filter.connect(sounds.hpf);
sounds.hpf.connect(sounds.echo);
sounds.echo.connect(sounds.echoMeter);
sounds.filter.connect(sounds.meter);

function setBGAnimation(){
  let i = 0, count = 0;
  setInterval( () => {
      i = i === 0 ? 1 : 0;
      count++;
      
      if(moused){
          let hue = Math.floor(count/30);
          document.body.style.filter = `hue-rotate(${Math.floor(hue)}deg) brightness(100%)`;
      } else {
          document.body.style.filter = `hue-rotate(0deg)`;
      }
      
      $('#note_1').css('opacity',1 - (0.1 + Tone.dbToGain(sounds.meter.getValue())*2));
      $('#note_2').css('transform', `translate(360px) scale(${1 + Tone.dbToGain(sounds.echoMeter.getValue())*1.1})`);
      $('#note_0').css('transform', `translate(-100px) scale(${1 + Tone.dbToGain(sounds.echoMeter.getValue())*1.9})`);
if(Tone.dbToGain(sounds.echoMeter.getValue())>0.09){
    const bumpEvent = new CustomEvent('bump');
        window.dispatchEvent(bumpEvent);
    }
  }, 30)
}



setBGAnimation();

let started = false;

window.addEventListener('mousedown', (e) => {
Tone.start();
sounds.loop.loop = true;

if(!started){
    sounds.loop.start();    
    started = true;
}

sounds.filter.frequency.rampTo(1000, 1);
moused = true;   
});

window.addEventListener('mouseup',(e) => {
  sounds.filter.frequency.rampTo(200, 1);
  moused=false;
});

Tone.start();
let loadScript = loadingIndicator.init();
var paintingFlag = true;
checkLoaded('addBackButton');