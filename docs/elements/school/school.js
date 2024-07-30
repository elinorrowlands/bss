

window.layersToSvg = true;
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


  
  window.echo = new Tone.FeedbackDelay('4n',0.5).toDestination();
  const synth = new Tone.PolySynth({
    options:{
      oscillator:{
        type:'sine'
      },
      envelope:{
        attack:1,
        decay:0.89,
        sustain:0.91,
        release:2.1
      },
      volume:-50
    }
  }).connect(echo);

  synth.toDestination();

  const meter = new Tone.Meter();
  synth.connect(meter);
  let level = 0;

  Tone.loaded().then(()=>{
      start();
  });
  
  window.cPenta = [0,2,4,7,9];
  
  function start(){
      
      multitouchMapper.setAction('.visual',{
          start: function(element, e, obj){
              Tone.start();
              
              let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
              if(window.layersToSvg) newElement = getContainerSvg(newElement);
              
              newElement.classList.add('on');
              
          },
  
          enter: function(element, e, obj){
              
              let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
              if(window.layersToSvg) newElement = getContainerSvg(newElement);
              
              newElement.classList.add('on');
              
          },
  
          end: function(element, e, obj){
              
              let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
              if(window.layersToSvg) newElement = getContainerSvg(newElement);
              
              newElement.classList.remove('on');
              
          },
  
          leave: function(element, e, obj){
              
              let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
              if(window.layersToSvg) newElement = getContainerSvg(newElement);
              
              
              newElement.classList.remove('on');
              
          },
  
          move: function(element, e, obj){
              let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
              if(window.layersToSvg) newElement = getContainerSvg(newElement);
              
              
          }
      })
  
  let count = 0;
  let hueBuffer = 0;
  
  }
  
  