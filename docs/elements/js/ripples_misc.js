const ready = () => {
    // add event listeners
    
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("touchmove", (e) => this.onMouseMove(e));
}

const render = () => {
        this.ripples.uniforms.velocity.value = [this.mouse.velocity.x, this.mouse.velocity.y];
        if(window.verbose)console.log('pre-lerp',this.mouse.velocity))
        this.mouse.velocity = {
            x: this.lerp(this.mouse.velocity.x, 0, 0.1),
            y: this.lerp(this.mouse.velocity.y, 0, 0.1),
        };
        if(window.verbose)console.log('post-lerp',this.mouse.velocity)

        this.ripples.uniforms.velocity.value = [this.mouse.velocity.x, this.mouse.velocity.y];

        this.ripples.uniforms.time.value++;

        // update the render target
        this.writePass && this.ripples.setRenderTarget(this.writePass);

    }
const afterRender = () => {
    // swap FBOs and update texture
    if(this.readPass && this.writePass) {
        this.swapPasses();
    }
}

const afterResize = () => {
    // update our window aspect ratio uniform
    boundingRect = this.getCanvasSizes();
    this.ripples.uniforms.resolution.value = [boundingRect.width, boundingRect.height];
}