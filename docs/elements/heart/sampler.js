let numberOfPlayers = 8;
let sample = './harlesden1.mp3';
window.players = [];
window.playCount = 0;

function spreadAcrossSample(query = 'image', players = window.players){
    let divisions = document.querySelectorAll(query).length;
    let allocations = [];
    for(let i = 0; i < divisions; i++){
        allocations.push(-1);
    }
    players.forEach((player, i)=>{
        let allocation = Math.floor(Math.random()*divisions);
        while(allocations[allocation] != -1){
            allocation = Math.floor(Math.random()*divisions);
        }
        allocations[allocation] = i;
        player.allocation = allocation;
    })
}


window.addEventListener('load',()=>{
    for(let i = 0; i < numberOfPlayers; i++){
        players.push({
            player: new Tone.Player(sample).toDestination(),
            allocation: -1,
            playNumber:0
        });
        // for some reason setting the volume to zero on load doesn't work
        // players[i].volume.rampTo(-Infinity, 0.1)
        players[i].player.connect(echo);
    }
    let divisions = document.querySelectorAll('image').length;
    
    window.addEventListener('touch-pickup', (e)=>{
        let {x,y, element, type} = e.detail;
        let id = parseInt(element.id.split('_')[1]);
        if(isNaN(id)){
            return;
        }
        
        if(type == 'start' || type == 'enter'){
            window.lengthInSeconds = players[0].player.buffer.duration;
            let nextAvailablePlayer = players.map(player=>player.player.state).indexOf('stopped');
            
            playCount++;
            if(!players[nextAvailablePlayer]) {
                const lowestPlayNumberPlayer = players.reduce((lowestPlayer, currentPlayer) => {
                    if (currentPlayer.playNumber < lowestPlayer.playNumber) {
                        return currentPlayer;
                    } else {
                        return lowestPlayer;
                    }
                }, players[0]);
                nextAvailablePlayer = players.indexOf(lowestPlayNumberPlayer);
            };
            
            players[nextAvailablePlayer].playNumber = playCount;
            players[nextAvailablePlayer].player.volume.rampTo(-6, 0.01);
            players[nextAvailablePlayer].player.start(Tone.now(), (id/divisions)*lengthInSeconds*0.9);
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



