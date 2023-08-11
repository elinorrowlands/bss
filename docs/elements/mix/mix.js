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
}

let mix = {
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

let sounds = [
    new Tone.Player("channels_L.mp3"),
    new Tone.Player("channels_R.mp3")
];

Tone.loaded().then(start);

sounds.forEach((sound,i) => {
    sound.connect(mix.channels[i]);
    sound.connect(mix.meters[i]);
    sound.connect(mix.reverbChannel);
    mix.channels[i].pan.value = 0.5 - i;
    mix.channels[i].connect(i === 0 ? mix.crossFader.a : mix.crossFader.b);
});

let startButton = document.querySelector("#start");
let playFlag = false;

startButton.addEventListener("click", () => {
    playFlag = !playFlag;
    setMeters(playFlag);
    startButton.innerHTML = playFlag ? "STOP" : "START";
    sounds.forEach(sound => {
        sound[playFlag ? 'start' : 'stop']()
    })
})

let meterUpdate = function(){
    mix.meters.forEach((meter,i) => {
        let level = Tone.dbToGain(meter.getValue());
        document.querySelector(`#circle_${i}`).style.r = `${Math.floor(level*1000)}%`;
    })
}

let meterInterval;

function setMeters(state){
    if(state){
        meterInterval = setInterval(meterUpdate, 100);
    } else {
        clearInterval(meterInterval);
    }
}



document.querySelector('#crossFader').addEventListener("input", (e) => {
    let value = parseFloat(e.target.value);
    let percentage = value * 50;
    let leftValue = (percentage/2);
    let rightValue = 100-(percentage/2);
    document.querySelector('main').style.background = `linear-gradient(90deg, rgba(249,212,35,0.5) ${leftValue}%, rgba(32,42,68,0.4) ${rightValue}%)`;
    mix.crossFader.fade.rampTo(value, 0.1, Tone.now());

    mix.channels.forEach((channel,i) => {
        let balance = 0.5*(i-value);
        channel.pan.rampTo(balance, 0.1, Tone.now())
    })

    document.querySelector('.body__background').style.filter = `hue-rotate(${Math.floor(180+(value*120))}deg)`;
    
})