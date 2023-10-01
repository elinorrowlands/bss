/**
 * 
 * @param e custom event
 */

export default function update(e={x:0,y:0}){
    let {x, y} = e;
    // act as if the mouse is pressed
    this.mouse.last.x = x;
    this.mouse.last.y = y;
    console.log('update', this.mouse.last.x, this.mouse.last.y)
    let weblgMouseCoords = this.ripples.mouseToPlaneCoords(this.mouse.last.x, this.mouse.last.y);
    this.ripples.uniforms.lastMousePosition.value = [weblgMouseCoords.x, weblgMouseCoords.y];
    
    // this.mouse.current.x = x;
    // this.mouse.current.y = y;
    
    Object.assign(this.mouse.current, e);

    
    weblgMouseCoords = this.ripples.mouseToPlaneCoords(this.mouse.current.x, this.mouse.current.y);
    this.ripples.uniforms.mousePosition.value = [weblgMouseCoords.x, weblgMouseCoords.y];
    this.mouse.velocity = {
        x: (this.mouse.current.x - this.mouse.last.x) / 16,
        y: (this.mouse.current.y - this.mouse.last.y) / 16
    };
}