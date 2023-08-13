let meterInterval;
let startButton = document.querySelector("#start");
let playFlag = false;

let meterUpdate = function(){
    mix.meters.forEach((meter,i) => {
        let level = Tone.dbToGain(meter.getValue());
        document.querySelector(`#circle_${i}`).style.r = `${Math.floor(level*10000)}`;
        // document.querySelector(`#circle_${i}`).style.ry = `${Math.floor(level*100000)}`;
    })
}


// next
function scroll(){
    document.querySelector('image').style.transform='translate(-50%, -100%) scale(2)';
}

function setMeters(state){
    if(state){
        meterInterval = setInterval(meterUpdate, 100);
    } else {
        clearInterval(meterInterval);
    }
}

function loaded(){
    // todo: add load status message for screen readers
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
    crossFader: new Tone.CrossFade(0.5)     
}

mix.reverbChannel.connect(mix.filter);
mix.filter.connect(mix.reverb);
mix.crossFader.toDestination();

window.sounds = [
    new Tone.Player("channels_L.mp3"),
    new Tone.Player("channels_R.mp3")
];

window.durations = [0,0];
window.heights = [0,0];

// is this still relevant? or now redundant?

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

    sounds.forEach(sound => {
        sound[playFlag ? 'start' : 'stop']()
    })
})



import crossFaderUpdate from './crossFader.js';
document.querySelector('#crossFader').addEventListener("input", crossFaderUpdate);