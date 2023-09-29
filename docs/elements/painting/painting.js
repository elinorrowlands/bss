window.layersToSvg = true;
window.multitouchMapper = window.touch;

function getContainerSvg(containerElement){
  do {
    containerElement = containerElement.parentElement;
} while (containerElement.tagName !== 'svg');
// containerElement = containerElement.parentElement;
console.log('getcontainersvg', containerElement)
return containerElement;
}


function fixFolder(){
    document.querySelectorAll('image').forEach((x,i)=>{
      x.setAttribute('xlink:href',`svg-test/${x.getAttribute('xlink:href')}`)
    })
  }

  document.querySelectorAll('svg image').forEach((e,i)=>{
    if(i>0){
      e.id =`note_${i-1}`;
      e.style.transformOrigin = 'center center';
      e.parentElement.classList.add('pickup');
      
      e.parentElement.querySelectorAll(`[id$='_hc']`).forEach((x)=>{
        x.querySelectorAll('path').forEach((y,j)=>{
          y.classList.add('visual');
          y.id = `note_${i-1}_hc_${j}`;
          y.style.opacity=0;
        })
      })

    } else {
      e.style.opacity=0;
    }
  })
  
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

  /**
   * Loading code to break out
  */
  let loadBlinkCount = 0;
  const loadBlink = () => {
      document.querySelectorAll('.loadMsg')[0].style.opacity=loadBlinkCount%2 ? 0.8:1;
      document.querySelectorAll('.loading')[0].style.backgroundColor=loadBlinkCount%2 ? 'navy':'#0081ff';
      document.querySelectorAll('.loadMsg')[0].style.backgroundColor=loadBlinkCount%2 ? 'navy':'#0081ff';
      loadBlinkCount++;
  }

  setInterval(loadBlink, 5000);

  function loaded(){
      // todo: add load status message for screen readers
      document.querySelectorAll('.loading').forEach(element => {
          clearInterval(loadBlink);
          element.style.opacity = 0;
          setTimeout(() => {
              element.style.display = 'none';
          }, 1000);
      });
  }
  Tone.loaded().then(()=>{
      start();
  });
  
  function start(){
      loaded();
      multitouchMapper.setAction('.visual',{
          
          start: function(element, e, obj){
              
              Tone.start();
              console.log('start',element.id, document.querySelector(`#${element.id.split('_hc')[0]}`))
              console.log(Tone.Frequency(1*(parseFloat(element.id.split('_')[1])%12)+72, 'midi').toFrequency())
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
              console.log(window.layersToSvg, newElement);
              newElement.style.transition = 'all 4s ease';
              newElement.style.opacity = 0;
              synth._voices.forEach((voice,i)=>{
                  voice.detune.rampTo((i%2 == 0 ? obj.distance.x : obj.distance.y),1)
              })
              
              document.body.style.filter = `hue-rotate(${obj.distance.y + obj.distance.x}deg)`;
              newElement.style.transform = `rotate(${level * obj.distance.y * 100}deg)`;
              console.log(newElement.style.transform)
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
  