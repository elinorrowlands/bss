let faders;

window.playToggle = function playToggle(override = false, player = window.player){
    if(player.state == 'started' && !override){
        player.stop();
    }        
    else {
        player.start();
    }
    playButton.innerHTML = player.state == 'started' ? 'STOP' : 'PLAY';
}


window.interpolateParameter = function interpolateParameter(value, parameterName, start, end){
    return start[parameterName] * (1-value) + end[parameterName] * value;
}

window.interpolateColour = function interpolateColour(value, start, end){
    let hsl = [start.colour[0] * (1-value) + end.colour[0] * value, start.colour[1] * (1-value) + end.colour[1] * value, start.colour[2] * (1-value) + end.colour[2] * value];
    return `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%)`;
}

window.saveState = function saveState(index){
    let parameters = ['echo', 'lpf', 'comb__time', 'comb__feedback'];
    parameters.forEach(parameterName=>{
        states[index][parameterName] = faders[parameterName].value;
    })
}


window.interpolateStates = function interpolateStates(value, parameters=['echo', 'lpf', 'comb__time', 'comb__feedback']){

    let updateFaders = true;
    if(updateFaders){
        parameters.forEach(parameterName=>{
            faders[parameterName].value = interpolateParameter(value, parameterName, states[1], states[2]);
        })
    }

    


    echo.wet.value = states[1].echo * (1-value) + states[2].echo * value;
    
    lpf.frequency.rampTo(faders.lpf.value*20000+50, 0.1)
    // console.log(faders.lpf.value*20000+50, 0.1)
    comb.delayTime.rampTo(states[1].comb__time * (1-value) + states[2].comb__time * value * 0.8 + 0.1, 0.1);
    comb.resonance.rampTo(states[1].comb__feedback * (1-value) + states[2].comb__feedback * value * 0.8 + 0.1, 0.1);
}

const loader = ()=>{
    touch.depth=4;

    faders = {
        echo: document.querySelector('#effect__echo'),
        lpf: document.querySelector('#effect__lpf'),
        comb__time: document.querySelector('#effect__comb__time'),
        comb__feedback: document.querySelector('#effect__comb__feedback')
    }
    
    window.playButton = document.querySelector('#play');
    window.saveButton1 = document.querySelector('#states__save__1');
    window.saveButton2 = document.querySelector('#states__save__2');
    
    window.states = {
        "1": {
            "echo": "0.95",
            "lpf": "0.02",
            "comb__time": "0.1",
            "comb__feedback": "0.9",
            "colour": [
                0,
                0,
                0
            ]
        },
        "2": {
            "echo": "0.05",
            "lpf": "0.9",
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

    let parametersTypes = {
        echo: {
            parameter: echo.wet,
            process: (value) => (value * 20000) + 50,
            time: 0.1
        },
        lpf: {
            parameter: lpf.frequency,
            process: (value) => (value * 20000) + 50,
            time: 0.1
        },
        comb__time: {
            parameter: comb.delayTime,
            process: (value) => (value * 0.5),
            time: 0.1
        },
        comb__feedback: {
            parameter: comb.resonance,
            process: (value) => (value),
            time: 0.1
        }
    }
    
    let parameterNames = Object.keys(parametersTypes);
    parameterNames.forEach(parameterName=>{
        faders[parameterName].addEventListener('input', (e)=>{
            parametersTypes[parameterName]
                .parameter.rampTo(
                    parametersTypes[parameterName].process(parseFloat(e.target.value))
                    , parametersTypes[parameterName].time
                );
        })
    })
    

    document.querySelector('#states__interpolate').dispatchEvent(new Event('input'));

}

export default loader;