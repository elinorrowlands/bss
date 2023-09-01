import RipplesScene from './ripplesScene.js'
import ramps from './tone_ramps.js';

let mouseX = 0;
let started = false;
let moused = false;
let bgAnimation;
let count = 0;
var paintingFlag = false;
window.addEventListener("load", () => {
    if(!window.rippleScene){
        window.rippleScene = new RipplesScene({
            viscosity: 10,
            speed: 8,
            size: 0.75,
            displacementStrength: 1.5,
            lightIntensity: 5,
            shadowIntensity: 2.5,
        });  
        rippleScene.gui.hide();    
    }
});