let meter = new Tone.Meter();
Tone.Master.connect(meter);

let trails = [];
function setup(){
    window.canv = createCanvas(window.innerWidth, window.innerHeight);
    document.querySelector('main').appendChild(canv.elt);
    for (let i = 0; i < 100; i++) {
        trails.push({ x: 0, y: 0});
      }
}

function windowResized(){
    resizeCanvas(window.innerWidth, window.innerHeight);
}

let gain = 0, count=0;

function draw(){
    count++;
    // console.log(meter.getValue(), Tone.dbToGain(meter.getValue()), Tone.dbToGain(meter.getValue())>0.1)
    // if(count%10==0)gain = Tone.dbToGain(meter.getValue())*80;
    if(gain > Tone.dbToGain(meter.getValue())*100) {gain -=0.01} else if(gain < Tone.dbToGain(meter.getValue())*100) {gain +=0.1}
    
    
    clear();
    if(mouseIsPressed){
        trails[trails.length - 1] = { x: mouseX, y: mouseY, size: (mouseY / height * gain) };
        for (let i = 0; i < trails.length - 1; i++) {
            trails[i] = trails[i + 1];
          }
          
    }
    
    for (let i = 0; i < trails.length; i++) {
        let colour = floor(map(i, 0, trails.length -1, 0, 255));
        let diameter = floor(map(i, 0, trails.length - 1, 0, 70) * trails[i].size);
        
        noStroke();
        fill(colour* (1-(mouseY / height)), i, constrain(150+(sin(gain)*10),0,255), constrain(40*gain,0,255));
        // console.log(constrain(150+(sin(gain)*10),0,255), sin(gain)*10)
        // diameter=200;
        ellipse(trails[i].x, trails[i].y, diameter, diameter);
      }
      
      
      
    // background(0,1);
}