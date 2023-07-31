let faders;

function playToggle(override = false, player){
    if(player.state == 'started' && !override){
        player.stop();
    }        
    else {
        player.start();
    }
    playButton.innerHTML = player.state == 'started' ? 'STOP' : 'PLAY';
}


function interpolateParameter(value, parameterName, start, end){
    return start[parameterName] * (1-value) + end[parameterName] * value;
}

function interpolateColour(value, start, end){
    let hsl = [start.colour[0] * (1-value) + end.colour[0] * value, start.colour[1] * (1-value) + end.colour[1] * value, start.colour[2] * (1-value) + end.colour[2] * value];
    return `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%)`;
}

function saveState(index){
    let parameters = ['echo', 'lpf', 'comb__time', 'comb__feedback'];
    parameters.forEach(parameterName=>{
        states[index][parameterName] = faders[parameterName].value;
    })
    
    states[index].colour = RGBToHSL(...hexToRGB(document.querySelector('#colour-picker').value));
}


function interpolateStates(value){
    let parameters = ['echo', 'lpf', 'comb__time', 'comb__feedback'];
   
    if(true){
        parameters.forEach(parameterName=>{
            faders[parameterName].value = interpolateParameter(value, parameterName, states[1], states[2]);
        })
    }
    
    let hsl = hslToArray(interpolateColour(value, states[1], states[2]));

    if(true){
        document.querySelector('#colour-picker').value = HSLToHex(...hsl);
    }

    document.body.style.backgroundColor = document.querySelector('#colour-picker').value;

    echo.wet.value = states[1].echo * (1-value) + states[2].echo * value;
    
    lpf.frequency.rampTo(faders.lpf.value*20000+50, 0.1)
    comb.delayTime.rampTo(states[1].comb__time * (1-value) + states[2].comb__time * value * 0.8 + 0.1, 0.1);
    comb.resonance.rampTo(states[1].comb__feedback * (1-value) + states[2].comb__feedback * value * 0.8 + 0.1, 0.1);
}

const loader = ()=>{
    multitouchMapper.depth=4;

    faders = {
        echo: document.querySelector('#effect__echo'),
        lpf: document.querySelector('#effect__lpf'),
        comb__time: document.querySelector('#effect__comb__time'),
        comb__feedback: document.querySelector('#effect__comb__feedback')
    }
    
    const playButton = document.querySelector('#play');
    const saveButton1 = document.querySelector('#states__save__1');
    const saveButton2 = document.querySelector('#states__save__2');
    
    window.states = {
        "1": {
            "echo": "0.95",
            "lpf": "0.02",
            "comb__time": "0.15",
            "comb__feedback": "0.83",
            "colour": [
                236,
                100,
                49
            ]
        },
        "2": {
            "echo": "0.05",
            "lpf": "0.83",
            "comb__time": "0.15",
            "comb__feedback": "0",
            "colour": [
                211,
                98,
                66
            ]
        }
    }

    states.current={};
    Object.assign(states.current, states[1]);

   

    window.hslToArray = function hslToArray(hsl){
        // let output = hsl.match(/\d+/g).map(Number);
        let output = hsl.split('(')[1].split(')')[0].split(',');
        output = output.map(x=>parseFloat(x));
        return output;
    }

    

    document.querySelector('#states__interpolate').addEventListener('input', (e)=>{
        interpolateStates(e.target.value);
    })

    
    saveButton1.addEventListener('click', (e)=>{
        saveState(1);
    })

    saveButton2.addEventListener('click', ()=>{
        saveState(2);
    })

    window.player = new Tone.Player('./sounds/98823__deleted_user_1654820__grand-union-canal-kensal-green.mp3');
    window.lpf = new Tone.Filter(200, 'lowpass');
    window.hpf = new Tone.Filter(200, 'highpass');
    window.echo = new Tone.FeedbackDelay(0.5, 0.8);
    window.comb = new Tone.FeedbackCombFilter(0.5, 0.5);

    player.loop = true;
    player.chain(comb, hpf, echo, lpf, Tone.Master);
    player.chain(lpf, Tone.Master);


    playButton.addEventListener('click', () => {
        Tone.start();
        if(player.state == 'started'){
            player.stop();
        }        
        else {
            player.start();
        }
        playButton.innerHTML = player.state == 'started' ? 'STOP' : 'PLAY';
    });

    faders.echo.addEventListener('input', (e) => {
        echo.wet.rampTo(parseFloat(e.target.value), 0.1);
    });

    faders.lpf.addEventListener('input',(e)=>{
        lpf.frequency.rampTo(parseFloat(e.target.value)*20000+50, 0.1);
    })

    faders.comb__time.addEventListener('input',(e)=>{
        comb.delayTime.rampTo(parseFloat(e.target.value)*0.5, 0.2);
    })

    faders.comb__feedback.addEventListener('input',(e)=>{
        comb.resonance.rampTo(parseFloat(e.target.value), 0.1);
    })

    setInteractions();

    document.querySelector('#states__interpolate').dispatchEvent(new Event('input'));

    
}