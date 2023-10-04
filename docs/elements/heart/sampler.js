let numberOfPlayers = 8;
window.players = [];
window.playCount = 0;

window.addEventListener('load',()=>{
    for(let i = 0; i < numberOfPlayers; i++){
        players.push({
            player: new Tone.Player('./harlesden1.mp3').toDestination(),
            allocation: -1,
            playNumber:0
        });
        // players[i].volume.rampTo(-Infinity, 0.1)
        players[i].player.connect(echo);
    }
    let divisions = document.querySelectorAll('image').length;
    
    window.addEventListener('touch-pickup', (e)=>{
        let {x,y, element, type} = e.detail;
        console.log(type)
        let id = parseInt(element.id.split('_')[1]);
        if(isNaN(id)){
            console.log('id is NaN');
            return;
        }
        if(type == 'start' || type == 'enter'){
            window.lengthInSeconds = players[0].player.buffer.duration;
            let nextAvailablePlayer = players.map(player=>player.player.state).indexOf('stopped');
            
            playCount++;
            if(!players[nextAvailablePlayer]) {
                
                // console.log('no player available')
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
            // console.log(id, divisions, lengthInSeconds, 'id/dvisions*length',(id/divisions)*lengthInSeconds);
        } else if (type == 'end' || type == 'leave'){
            // console.log(id, 'end')
            let playersToStop = players.filter(player=>player.allocation==id);
            // console.log(playersToStop)
            playersToStop.forEach(player=>{
                player.player.volume.rampTo(-Infinity, 1)
                player.player.stop("+1");
                player.allocation = -1;
            });
            
        }
    })
    
})



