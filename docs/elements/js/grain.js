let grainPlayer = new Tone.GrainPlayer('../../loops/bubble.m4a').toDestination();
grainPlayer.grainSize=2
grainPlayer.loop = true
grainPlayer.overlap = 2
grainPlayer.playbackRate=2
// let convolver = new Tone.Convolver('../../loops/bubble.m4a').toDestination();
// let filter = new Tone.Filter(200000).connect(convolver);
// let tremolo = new Tone.Tremolo(20,0.9).start().connect(filter)


// let noise = new Tone.Noise().connect(tremolo).start()
window.addEventListener('touch-pickup',(e)=>{
    let {x,y, type} = e.detail;
    if(type=='start' || type=='move')grainPlayer.start(x/window.innerWidth, Tone.immediate());
    // if(type=='end')grainPlayer.stop();
    grainPlayer.playbackRate = y/window.innerHeight + 0.5
    grainPlayer.overlap = Math.floor(x/window.innerWidth*5) 
})