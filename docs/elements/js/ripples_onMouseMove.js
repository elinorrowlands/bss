export default function onMouseMove(e) {

    // approximate
    const frameDuration = 16;
    let updateVelocity = true;

    if(!e.buttons){
        console.log('no buttons')
        this.mouse.last.x = this.mouse.current.x;
        this.mouse.last.y = this.mouse.current.y;
    }

    if(this.ripples && (e.buttons || e.targetTouches)) {
        // velocity: mouse position minus our mouse last position
        this.mouse.last.x = this.mouse.current.x;
        this.mouse.last.y = this.mouse.current.y;

        let weblgMouseCoords = this.ripples.mouseToPlaneCoords(this.mouse.last.x, this.mouse.last.y);
        this.ripples.uniforms.lastMousePosition.value = [weblgMouseCoords.x, weblgMouseCoords.y];
        
        updateVelocity = [this.mouse.last.x, this.mouse.last.y, this.mouse.current.x, this.mouse.current.y] != [0,0,0,0];

        if(
          (  this.mouse.last.x === 0
            && this.mouse.last.y === 0
            && this.mouse.current.x === 0
            && this.mouse.current.y === 0) ||
            (
                Math.abs(this.mouse.last.x - this.mouse.current.x) > 5 ||
                Math.abs(this.mouse.last.y - this.mouse.current.y) > 5
            )
        ) {
            updateVelocity = false;
            console.log('velocity (initial or greater than 5)',this.mouse.current.x - this.mouse.last.x, this.mouse.current.y - this.mouse.last.y)
        } else {
            console.log('velocity',this.mouse.current.x - this.mouse.last.x, this.mouse.current.y - this.mouse.last.y)
        }

        this.mouse.current.x = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
        this.mouse.current.y = e.targetTouches ? e.targetTouches[0].clientY : e.clientY;

        weblgMouseCoords = this.ripples.mouseToPlaneCoords(this.mouse.current.x, this.mouse.current.y);
        this.ripples.uniforms.mousePosition.value = [weblgMouseCoords.x, weblgMouseCoords.y];
        
        if(updateVelocity) {
            this.mouse.velocity = {
                x: (this.mouse.current.x - this.mouse.last.x) / 16,
                y: (this.mouse.current.y - this.mouse.last.y) / 16
            };
        }
    }

}