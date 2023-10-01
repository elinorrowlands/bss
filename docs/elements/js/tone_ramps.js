/**
 * A way to handle multiple ramps easily in Tone
 * @param {*} rampArray 
 */

function ramps(rampArray = []){
    rampArray.forEach(([target, value, time])=>{
        target.rampTo(value, time);
    })
}

export default ramps;