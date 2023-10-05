let numberOfPlayers = 8;
let sample = './harlesden1.mp3';

import { calculateStartInterval, getLowestPlayNumber } from './sampler_functions.js';

/**
 * Create a sampler with multiple players using different start times from the same sample
 * @param {*} sample 
 * @param {*} numberOfPlayers 
 * @param {*} distribute 
 * @param {*} voiceStealing 
 */

const initSampler = function(samplePath, numberOfPlayers = 6, distribute = calculateStartInterval, voiceStealing = true, connectEcho = true){
    //
    window.players = [];
    window.playCount = 0;
    
    for(let i = 0; i < numberOfPlayers; i++){
        players.push({
            player: new Tone.Player(samplePath).toDestination(),
            allocation: -1,
            playNumber:0
        });
        // for some reason, setting the volume to zero on load doesn't work
        // players[i].volume.rampTo(-Infinity, 0.1)
        if(connectEcho) players[i].player.connect(echo);
    }
    
    
    Tone.loaded().then(()=>{
        window.addEventListener('touch-pickup', (e)=>{
            let {x,y, element, type} = e.detail;
            let id = parseInt(element.id.split('_')[1]);
            if(isNaN(id)) return;
            
            if(type == 'start' || type == 'enter'){
                
                let nextAvailablePlayer = players.map(player=>player.player.state).indexOf('stopped');
                
                playCount++;
                
                if(!players[nextAvailablePlayer]) {
                    if(!voiceStealing) return;
                    let lowestPlayNumberPlayer = getLowestPlayNumber(players);
                    nextAvailablePlayer = players.indexOf(lowestPlayNumberPlayer);
                };
                
                players[nextAvailablePlayer].playNumber = playCount;
                players[nextAvailablePlayer].player.volume.rampTo(-6, 0.01);
                
                players[nextAvailablePlayer].player.start(Tone.now(), distribute('image', players, id), undefined);
                
                players[nextAvailablePlayer].allocation = id;
                
            } else if (type == 'end' || type == 'leave'){
                let playersToStop = players.filter(player=>player.allocation==id);
                playersToStop.forEach(player=>{
                    player.player.volume.rampTo(-Infinity, 1)
                    player.player.stop("+1");
                    player.allocation = -1;
                });
                
            }
        })
    })
    
}

window.addEventListener('load',()=>{
    initSampler(sample, numberOfPlayers, calculateStartInterval)
})



