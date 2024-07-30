// window.layersToSvg = true;
window.multitouchMapper = window.touch;

function getContainerSvg(containerElement){
  do {
    containerElement = containerElement.parentElement;
} while (containerElement.tagName !== 'svg');

return containerElement;
}


function fixFolder(){
  document.querySelectorAll('image').forEach((x,i)=>{
    x.setAttribute('xlink:href',`svg-test/${x.getAttribute('xlink:href')}`)
  })
}


  
  const echo = new Tone.FeedbackDelay('4n',0.5).toDestination();
  const synth = new Tone.PolySynth({
    options:{
      oscillator:{
        type:'sine'
      },
      envelope:{
        attack:0.1,
        decay:0.89,
        sustain:0.91,
        release:2.1
      },
      volume:-40
    }
  }).connect(echo);

  synth.toDestination();

  const meter = new Tone.Meter();
  synth.connect(meter);
  let level = 0;

  Tone.loaded().then(()=>{
      start();
  });
  
  function start(){
      
      multitouchMapper.setAction('.visual',{
          
          start: function(element, e, obj){
              
              Tone.start();
              
              let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
              if(window.layersToSvg) newElement = getContainerSvg(newElement);
              newElement.style.transition = 'all 0.1s ease';
              newElement.style.opacity = 0.3;
              synth.triggerAttack(Tone.Frequency(1*(parseFloat(element.id.split('_')[1])%12)+72, 'midi').toFrequency());
          },
  
          enter: function(element, e, obj){
              
              let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
              if(window.layersToSvg) newElement = getContainerSvg(newElement);
              newElement.style.transition = 'all 0.1s ease';
              newElement.style.opacity = 0.3;
              synth.triggerAttack(Tone.Frequency(1*(parseFloat(element.id.split('_')[1])%12)+72, 'midi').toFrequency());
          },
  
          end: function(element, e, obj){
              
              let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
              if(window.layersToSvg) newElement = getContainerSvg(newElement);
              newElement.style.transition = 'all 1s ease';
              newElement.style.opacity = 1;
              synth.triggerRelease(Tone.Frequency(1*(parseFloat(element.id.split('_')[1])%12)+72, 'midi').toFrequency())
              newElement.style.transform = `rotate(${0}deg)`;
          },
  
          leave: function(element, e, obj){
              
              let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
              if(window.layersToSvg) newElement = getContainerSvg(newElement);
              
              newElement.style.transition = 'all 1s ease';
              newElement.style.opacity = 1;
              synth.triggerRelease(Tone.Frequency(1*(parseFloat(element.id.split('_')[1])%12)+72, 'midi').toFrequency())
              newElement.style.transform = `rotate(${0}deg)`;
          },
  
          move: function(element, e, obj){
              let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
              if(window.layersToSvg) newElement = getContainerSvg(newElement);
              
              newElement.style.transition = 'all 4s ease';
              newElement.style.opacity = 0;
              synth._voices.forEach((voice,i)=>{
                  voice.detune.rampTo((i%2 == 0 ? obj.distance.x : obj.distance.y),1)
              })
              
              document.body.style.filter = `hue-rotate(${obj.distance.y + obj.distance.x}deg)`;
              newElement.style.transform = `rotate(${parseInt(level * obj.distance.y * 100)}deg)`;
              
          }
      })
  
  let count = 0;
  let hueBuffer = 0;
  window.setInterval(()=>{
      count++;
      level = Tone.dbToGain(meter.getValue());
      
      let hue = Math.floor(level*6000);
      
      if(hue >= hueBuffer){
          hueBuffer = hue;
      } else {
          hueBuffer -= 1;
          hue = hueBuffer;
      }
      if(hue > 100){
          hue = 100;
      }
      if(hue < 0){
          hue = 0;
      }
      document.body.style.filter = `hue-rotate(${hue}deg)`;
      document.querySelectorAll(`[id^='note_']`).forEach((e,i)=>{
      
      })
  },300)
  }
  