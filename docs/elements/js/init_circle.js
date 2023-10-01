import RipplesScene from './ripplesScene.js'

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