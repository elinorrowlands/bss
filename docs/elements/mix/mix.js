let meterInterval;
let startButton = document.querySelector("#start");
let playFlag = false;
let startTime = 0;
let elapsedTime = 0;
let mixRecord = [];
let scrollWaves = false;

let meterUpdate = function(){
    let ids = ['#left__wave', '#right__wave'];
    let lines = ['#pos__left', '#pos__right']
    
    mix.meters.forEach((meter,i) => {
        let level = Tone.dbToGain(meter.getValue());
        //todo: multiply by crossfader value accordingly
        let crossFaderValue = document.querySelector('#crossFader').value;
        let multipliedLevel = (level * (i === 1 ? crossFaderValue : (1-crossFaderValue)) * 5000) + 5;
        // console.log(Math.floor(multipliedLevel));
        // console.log(i, multipliedLevel);
        document.querySelector(`#circle_${i}`).style.r = `${Math.floor(multipliedLevel)}px`;
        // console.log(i, multipliedLevel, document.querySelector(`#circle_${i}`).getAttribute('fill'));
        // document.querySelector(`#circle_${1 - i}`).style.r = `${Math.floor(multipliedLevel)}`;
        // console.log(i, level);
        // document.querySelector(ids[i]).style.opacity = (level*12)+0.5;
        // document.querySelector(`#circle_${i}`).style.ry = `${Math.floor(level*00000)}`;
    })
    
    elapsedTime = Tone.now() - startTime;

    sounds.forEach((sound,i) => {
        let position = elapsedTime / durations[i];
        
        let y = position * 100;
        if(scrollWaves){
            y = (0-(200-(position*200)));
            document.querySelector(ids[i]).style.transform = `translate(-50%, ${y}%) scale(2)`;
        } else {
            
            document.querySelector(lines[i]).setAttribute('height', `${y}%`);
        }
    })


}


// next
function scroll(){
    document.querySelector('image').style.transform='translate(-50%, -100%) scale(2)';
}

window.scroll=scroll;

function setMeters(state){
    if(state){
        meterInterval = setInterval(meterUpdate, 100);
    } else {
        clearInterval(meterInterval);
    }
}

function loaded(){
    document.querySelectorAll('.loading').forEach(element => {
        element.style.opacity = 0;
        setTimeout(() => {
            element.style.display = 'none';
        }, 1000);
    });
}

function start(){
    loaded();
    sounds.forEach((sound,i) => {
        durations[i] = sound.buffer.duration;
    })

    document.querySelectorAll('.waveform').forEach((element,i) => {
        heights[i] = element.clientHeight;
    })
}

window.mix = {
    channels:[new Tone.Channel(), new Tone.Channel()],
    meters:[new Tone.Meter(), new Tone.Meter()],
    filter: new Tone.Filter(200, "lowpass"),
    reverb: new Tone.Reverb(2).toDestination(),
    reverbChannel: new Tone.Channel(),
    active:[true, true],
    crossFader: new Tone.CrossFade(0.5),
    notch: new Tone.Filter(200, "notch")      
}

mix.reverbChannel.connect(mix.filter);
mix.filter.connect(mix.reverb);
mix.crossFader.connect(mix.notch);
// mix.crossFader.toDestination();
mix.notch.toDestination();

window.sounds = [
    new Tone.Player("channels_L.mp3"),
    new Tone.Player("channels_R.mp3")
];

window.durations = [0,0];
window.heights = [0,0];

// is this tone.loaded call still relevant? or now redundant?

Tone.loaded().then(start);

sounds.forEach((sound,i) => {
    sound.connect(mix.channels[i]);
    sound.connect(mix.meters[i]);
    sound.connect(mix.reverbChannel);

    mix.channels[i].pan.value = 0.5 - i;
    mix.channels[i].connect(i === 0 ? mix.crossFader.a : mix.crossFader.b);
});

startButton.addEventListener("click", () => {
    playFlag = !playFlag;
    crossFaderUpdate({target:{value:0.5}});
    setMeters(playFlag);

    startButton.innerHTML = playFlag ? "STOP" : "START";
    if(playFlag){
        startTime = Tone.now();
    }

    sounds.forEach(sound => {
        sound[playFlag ? 'start' : 'stop']()
    })
})

import crossFaderUpdate from './crossFader.js';
document.querySelector('#crossFader').addEventListener("input", crossFaderUpdate);