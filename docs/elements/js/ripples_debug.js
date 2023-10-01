const ranges = {
    viscosity: [1, 15],
    speed: [1, 15],
    size: [0.5, 2.5]
}

/**
 * debug
 * set up dat.gui
 * set to preset
 */

export default function debug() {
        if(this.params.gui && this.params.guiParams) {

            this.params.guiParams.viscosity = this.params.viscosity;
            this.params.guiParams.speed = this.params.speed;
            this.params.guiParams.size = this.params.size;

            this.ripplesGui = this.params.gui.addFolder('Render targets');
            this.ripplesGui.open();

            this.guiViscosity = this.ripplesGui.add(this.params.guiParams, 'viscosity', ...ranges.viscosity);
            this.guiSpeed = this.ripplesGui.add(this.params.guiParams, 'speed', ...ranges.speed);
            this.guiSize = this.ripplesGui.add(this.params.guiParams, 'size', ...ranges.size).step(0.025);

            this.guiViscosity.onChange((value) => {
                if(this.ripples) {
                    this.ripples.uniforms.viscosity.value = value;
                }
            });

            this.guiSpeed.onChange((value) => {
                if(this.ripples) {
                    this.ripples.uniforms.speed.value = value;
                }
            });

            this.guiSize.onChange((value) => {
                if(this.ripples) {
                    this.ripples.uniforms.size.value = value;
                }
            });
        }
    }