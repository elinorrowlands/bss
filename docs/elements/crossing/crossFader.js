/**
 * Attach this to an input element
 * @param {*} e event
 */

const crossFaderUpdate = (e) => {
    let value = parseFloat(e.target.value);
    let percentage = value * 50;
    let leftValue = (percentage/2);
    let rightValue = 100-(percentage/2);
    // document.querySelector('main').style.background = `linear-gradient(90deg, rgba(249,212,35,0.2) ${leftValue}%, rgba(32,42,68,0.2) ${rightValue}%)`;
    document.querySelector('main').style.background = 'none';
    mix.crossFader.fade.rampTo(value, 0.1, Tone.now());
    document.querySelectorAll('.waveform').forEach((x,i)=>{
        x.style.opacity = 0.2 + Math.abs(1-i-value)*0.8;
    })
    mix.channels.forEach((channel,i) => {
        let balance = 0.5*(i-value);
        channel.pan.rampTo(balance, 0.1, Tone.now())
    })

    document.querySelector('.body__background').style.filter = `hue-rotate(${Math.floor(180+(value*120))}deg)`;
    
};

export default crossFaderUpdate;