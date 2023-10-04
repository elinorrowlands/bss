let numberOfPlayers = 8;
window.players = [];

window.addEventListener('load',()=>{
    for(let i = 0; i < numberOfPlayers; i++){
        players.push({
            player: new Tone.Player('./harlesden1.mp3').toDestination(),
            allocation: -1
        });
        
        // players[i].player.connect(echo);
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
            players[nextAvailablePlayer].player.start(Tone.now(), (id/divisions)*lengthInSeconds*0.9);
            players[nextAvailablePlayer].allocation = id;
            console.log(id, divisions, lengthInSeconds, 'id/dvisions*length',(id/divisions)*lengthInSeconds);
        } else if (type == 'end' || type == 'leave'){
            console.log(id, 'end')
            let playersToStop = players.filter(player=>player.allocation==id);
            console.log(playersToStop)
            playersToStop.forEach(player=>{
                player.player.stop();
                player.allocation = -1;
            });
            
        }
    })
    
})



// window.addEventListener('load',()=>{
//   let numberOfPlayers = 8;
//   window.players = [];
//   let playerAllocations = []
//   for(let i = 0; i < numberOfPlayers; i++){
//       players.push(new Tone.Player('./harlesden1.mp3').toDestination());
//       playerAllocations[i] = -1;
//       players[i].connect(echo);
//   }
  
//   let divisions = document.querySelectorAll('image').length;
//   console.log('divisions:', divisions)
//   window.addEventListener('touch-pickup', (e)=>{
//     let {x,y, element, type} = e.detail;
//     console.log(e.detail)
//     let id = parseInt(element.id.split('_')[1]);
//     console.log('id:', id)
//     if(isNaN(id)){
//       console.log('id is NaN');
//       return;
//     }
//     if(type == 'start' || type == 'enter'){
//       window.lengthInSeconds = players[0].buffer.duration;
//       let nextAvailablePlayer = players.map(player=>player.state).indexOf('stopped');
//       players[nextAvailablePlayer].start(Tone.now(), (id/divisions)*lengthInSeconds);
//       playerAllocations[nextAvailablePlayer] = id;
//       console.log(id, divisions, lengthInSeconds, 'id/dvisions*length',(id/divisions)*lengthInSeconds);
//     } else if (type == 'end' || type == 'leave'){
//       let playerToStop = playerAllocations.indexOf(id);
//       // playerAllocations[playerAllocations.indexOf(id)];
//       players[playerToStop].stop();
//       playerAllocations[playerToStop] = -1;
//     }
    
//   })
// })




