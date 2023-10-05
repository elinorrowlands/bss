const sounds = {
    loop: new Tone.Player("nesting.mp3"),
    // loop: new Tone.Player("../../loops/heart_heart_trees.m4a"),
    meter: new Tone.Meter(),
    filter: new Tone.Filter(200, "lowpass"),
    // hpf: new Tone.Filter(400, "highpass"),
    echo: new Tone.FeedbackDelay("2n", 0.5).toMaster(),
    echoMeter: new Tone.Meter()
}

let moused = false;

sounds.echo.wet.value = 1;
sounds.loop.connect(sounds.filter);
sounds.filter.toMaster();
// sounds.filter.connect(sounds.hpf);
// sounds.hpf.connect(sounds.echo);
sounds.echo.connect(sounds.echoMeter);
sounds.filter.connect(sounds.meter);

window.count = 0;

function setBGAnimation(){
  let i = 0;
  setInterval( () => {
      i = i === 0 ? 1 : 0;
      count++;
      
      if(moused){
        //   let hue = Math.floor(count/30);
        let hue = Math.floor(count/2) % 360;
          
          document.body.style.filter = `hue-rotate(${Math.floor(hue)}deg) brightness(110%)`;
          console.log(hue)
      } else {
          document.body.style.filter = `hue-rotate(0deg)`;
      }
      
    //   $('#note_1').css('opacity',1 - (0.1 + Tone.dbToGain(sounds.meter.getValue())*2));
    //   $('#note_2').css('transform', `translate(360px) scale(${1 + Tone.dbToGain(sounds.echoMeter.getValue())*1.1})`);
    //   $('#note_0').css('transform', `translate(-100px) scale(${1 + Tone.dbToGain(sounds.echoMeter.getValue())*1.9})`);
if(Tone.dbToGain(sounds.meter.getValue())>0.09){
    const bumpEvent = new CustomEvent('bump',{
        detail: {
            value: Tone.dbToGain(sounds.meter.getValue())
        }
    });
        window.dispatchEvent(bumpEvent);
    }
  }, 30)
}



setBGAnimation();

let started = false;

window.addEventListener('mousedown', (e) => {
    window.count = parseInt(e.clientX/window.innerWidth*360);
    console.log(window.count)
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
// checkLoaded('addBackButton');