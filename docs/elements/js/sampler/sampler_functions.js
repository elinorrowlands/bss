const calculateStartInterval = function(query = 'image', players = window.players, index = 0){
    let divisions = document.querySelectorAll(query).length;
    let lengthInSeconds = players[0].player.buffer.duration;
    return lengthInSeconds/divisions * index;
}

const getLowestPlayNumber = (players)=>{
   return players.reduce((lowestPlayer, currentPlayer) => {
        if (currentPlayer.playNumber < lowestPlayer.playNumber) {
            return currentPlayer;
        } else {
            return lowestPlayer;
        }
    }, players[0]);
}

export {calculateStartInterval, getLowestPlayNumber}