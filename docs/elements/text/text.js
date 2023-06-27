const echo = new Tone.FeedbackDelay('1n', 0.5).toDestination();
const player = new Tone.Player('./waters_excerpt.mp3').toDestination();
player.connect(echo);
const newCaption = ["00:00:06.420,00:00:08.160\nwhere is the water's edge?", '00:00:11.700,00:00:13.380\nin the wide expanses', '00:00:15.030,00:00:16.950\nor the half filled bathtub', '00:00:19.260,00:00:20.100\nin the river', '00:00:20.580,00:00:21.840\nor the boiling kettle', '00:00:22.770,00:00:23.760\nin the steam', '00:00:23.880,00:00:24.750\nor the snow', '00:00:25.140,00:00:28.170\nor the rainbow mist of a summer hose'];
let captionObject = syncCC.splitCaptions(newCaption);
console.log(captionObject);
let justText = captionObject.map(text => text.content[0]);
captionObject.forEach(text => {
    let textElement = document.createElement('div');
    Object.assign(textElement.style,{
        position: 'absolute',
        top: (5+Math.random()*80)+'%',
        left: (5+Math.random()*70)+'%',
        fontSize: (20+Math.random()*30)+'px',
        userSelect: 'none',
        cursor:'pointer'
    })
    textElement.innerHTML = text.content[0];
    textElement.classList.add('text');
    textElement.addEventListener('click', () => {
        player.start(Tone.now(), text.startS, text.endS-text.startS);
    })
    document.body.appendChild(textElement);
});