function checkLoaded(name) {
    const interval = 100;
    window.setTimeout(function() {
        if (window[name]) {
            window[name]();
        } else {
            checkLoaded(name);
        }
    }, interval);
}

const container = 'body';

const sounds = {
    loop: new Tone.Player("../../loops/rusty_can_0.mp3"),
    loop2: new Tone.Player("../../loops/rusty_can_1.mp3"),
    loop3: new Tone.Player("../../loops/rusty_can_2.mp3"),
    can: new Tone.Player("./can.mp3"),
    can2: new Tone.Player("./can.mp3"),
    meter: new Tone.Meter(),
    notch: new Tone.Filter(200, "notch").toMaster(),
    notch2: new Tone.Filter(200, "notch").toMaster(),
    filter: new Tone.Filter(200, "lowpass"),
    hpf: new Tone.Filter(400, "highpass"),
    echo: new Tone.FeedbackDelay("0.5", 0.5),
    echoMeter: new Tone.Meter(),
    loop2Meter: new Tone.Meter(),
    loop3Meter: new Tone.Meter(),
}

let moused = false;
sounds.can2.reverse = false;
sounds.can.toMaster();
sounds.can2.toMaster();
sounds.can.connect(sounds.echo);
sounds.can2.connect(sounds.echo);

sounds.echo.wet.value = 1;
sounds.echo.connect(sounds.notch2);

sounds.loop.volume.value=-12;

sounds.notch.Q.value = 0;
sounds.notch2.Q.value = 0;

sounds.loop2.volume.value=-Infinity;
sounds.loop3.volume.value=-Infinity;
sounds.loop.connect(sounds.filter);
sounds.loop2.connect(sounds.filter);
sounds.loop3.connect(sounds.filter);
sounds.loop2.connect(sounds.loop2Meter);
sounds.loop3.connect(sounds.loop3Meter);
sounds.echo.toMaster();

sounds.filter.Q.value = 0;
sounds.filter.connect(sounds.notch);
sounds.filter.connect(sounds.hpf);
sounds.notch.toMaster();
sounds.notch2.toMaster();
sounds.filter.toMaster();
sounds.hpf.connect(sounds.echo);
sounds.echo.connect(sounds.echoMeter);
sounds.filter.connect(sounds.meter);

function setBGAnimation(){
    let i = 0, count = 0;
    setInterval( () => {
        i = i === 0 ? 1 : 0;
        count++;
        
        if(moused){
            let hue = Math.floor(count/30%100);
            $('#can__bg').css('opacity',0.1 + Tone.dbToGain(sounds.meter.getLevel())*2);
            document.body.style.filter = `hue-rotate(${Math.floor(hue)}deg) brightness(100%)`;
            document.querySelectorAll('.canBG.ghost').forEach((el) => {
                el.style.filter = `hue-rotate(${Math.floor(hue)}deg) grayscale(${Tone.dbToGain(sounds.meter.getLevel())*1000}%)`;
                el.style.transform = `scale(${0.9 + Tone.dbToGain(sounds.meter.getLevel())*1})`;
                el.style.opacity = 0.9 + Tone.dbToGain(sounds.meter.getLevel());
            })
        } else {
            document.body.style.filter = `hue-rotate(0deg)`;
            $('#can__bg').css('opacity',0.5 + Tone.dbToGain(sounds.meter.getLevel()));
            $('.canBG.ghost').css('opacity',0.4 + Tone.dbToGain(sounds.meter.getLevel()));
            $('.canBG.ghost').css('opacity',0);
        }
       
        $('#waterCircle').css('opacity',0.1 + Tone.dbToGain(sounds.meter.getLevel()));
        $('#waterCircle').css('transform', `scale(${0.1 + Tone.dbToGain(sounds.meter.getLevel())*4})`);
        $('#can__0').css('transform', `scale(${0.9 + Tone.dbToGain(sounds.meter.getLevel())*1})`);
        $('#can__0__circ').css('r', `${100 + Tone.dbToGain(sounds.meter.getLevel())*4}`);
        $('#can__bg').css('transform', `scale(${0.9 + Tone.dbToGain(sounds.meter.getLevel())*1})`);
        $('#echoCircle').css('transform', `scale(${0 + Tone.dbToGain(sounds.echoMeter.getLevel())*6})`);
        $('#can__1').css('transform', `scale(${0.9 + Tone.dbToGain(sounds.echoMeter.getLevel())*1.3})`);
        $('#echoCircle2').css('transform', `scale(${0 + Tone.dbToGain(sounds.echoMeter.getLevel())*10})`);
        $('#can__0__circ').css('opacity', `${0.1 + Tone.dbToGain(sounds.loop2Meter.getLevel())*4}`);
        $('#can__1__circ').css('opacity', `${0.1 + Tone.dbToGain(sounds.loop3Meter.getLevel())*4}`);
        
    }, 30)
}

setBGAnimation();

let started = false;

window.addEventListener('mousedown', (e) => {
  Tone.start();
  sounds.loop.loop = true;
  sounds.loop2.loop = true;
  sounds.loop3.loop = true;
  if(!started){
      sounds.loop.start();    
      sounds.loop2.start();    
      sounds.loop3.start();    
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
checkLoaded('addBackButton');