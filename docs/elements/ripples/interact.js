document.querySelectorAll('svg image').forEach((e,i)=>{
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
    })


    const echo = new Tone.FeedbackDelay('4n',0.5).toMaster();
    const synth = new Tone.PolySynth({
       
        oscillator:{
          type:'sine'
        },
        envelope:{
          attack:0.1,
          decay:0.89,
          sustain:0.91,
          release:2.1
        },
        volume:-60
    }).connect(echo);
    synth.toMaster();
    synth.voices.forEach(x=>{
        x.envelope.attack = 0.5;
        x.envelope.release = 1;
        x.oscillator.type='sine';
      }
    )

    const meter = new Tone.Meter();
    synth.connect(meter);
    let level = 0;

    // multitouchMapper.setAction('.visual',{
        
    //     start: function(element, e, obj){
    //         Tone.start();
    //         let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
    //         newElement.style.transition = 'all 0.1s ease';
    //         newElement.style.opacity = 0.3;
    //         synth.triggerAttack(Tone.Frequency(1*(parseFloat(element.id.split('_')[1])%12)+72, 'midi').toFrequency());
    //     },

    //     enter: function(element, e, obj){
            
    //         let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
    //         newElement.style.transition = 'all 0.5s ease';
    //         newElement.style.opacity = 0.3;
    //         synth.triggerAttack(Tone.Frequency(1*(parseFloat(element.id.split('_')[1])%12)+72, 'midi').toFrequency());
    //     },

    //     end: function(element, e, obj){
            
    //         let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
    //         newElement.style.transition = 'all 1s ease';
    //         newElement.style.opacity = 1;
    //         synth.triggerRelease(Tone.Frequency(1*(parseFloat(element.id.split('_')[1])%12)+72, 'midi').toFrequency())
    //         newElement.parentElement.style.transform = `rotate(${0}deg)`;
    //     },

    //     leave: function(element, e, obj){ 
    //         let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
    //         newElement.style.transition = 'all 1s ease';
    //         newElement.style.opacity = 1;
    //         synth.triggerRelease(Tone.Frequency(1*(parseFloat(element.id.split('_')[1])%12)+72, 'midi').toFrequency())
    //         newElement.parentElement.style.transform = `rotate(${0}deg)`;
    //     },
        
    //     move: function(element, e, obj){
    //         let newElement = document.querySelector(`#${element.id.split('_hc')[0]}`);
    //         newElement.style.transition = 'all 4s ease';
    //         newElement.style.opacity = 0;
    //         synth.voices.forEach((voice,i)=>{
    //           voice.detune.rampTo((i%2 == 0 ? obj.distance.x : obj.distance.y),1)
    //         })
    //         document.body.style.filter = `hue-rotate(${obj.distance.y + obj.distance.x}deg)`;
    //     }
    // })


