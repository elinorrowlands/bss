let trails = [];
function setup(){
    window.canv = createCanvas(window.innerWidth, window.innerHeight);
    document.querySelector('main').appendChild(canv.elt);
    for (let i = 0; i < 50; i++) {
        trails.push({ x: 0, y: 0});
      }
}



function draw(){
    clear();
    if(mouseIsPressed){
        trails[trails.length - 1] = { x: mouseX, y: mouseY, size: (mouseY / height * 2) };
        for (let i = 0; i < trails.length - 1; i++) {
            trails[i] = trails[i + 1];
          }
          
    }
    
    for (let i = 0; i < trails.length; i++) {
        let colour = floor(map(i, 0, trails.length -1, 0, 255));
        let diameter = floor(map(i, 0, trails.length - 1, 0, 50) * trails[i].size);
        
        noStroke();
        fill(colour, 200);
        ellipse(trails[i].x, trails[i].y, diameter, diameter);
      }
      
      
      
    // background(0,1);
}