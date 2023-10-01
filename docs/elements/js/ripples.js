import onMouseMove from './ripples_onMouseMove.js';
import debug from './ripples_debug.js';
import update from './ripples_update.js';
import { ripplesFs, ripplesVs } from './ripples_shaders.js';

/***
This is the class that handles the drawing of the ripples
It is done with FBOs swapping with 2 render targets
***/

export default class Ripples {

    constructor({
        callback = null,
        curtains = null,
        container = null,

        viscosity = 2,
        speed = 3.5,
        size = 1,

        // debug
        gui = null,
        guiParams = null,
    } = {}) {

        if(!curtains) return;

        this.curtains = curtains;

        this.params = {
            container: this.curtains.container,
            callback: callback,

            viscosity: viscosity,
            speed: speed,
            size: size,

            gui: gui,
            guiParams: guiParams,
        };

        this.mouse = {
            current: {
                x: 0,
                y: 0,
            },
            last: {
                x: 0,
                y: 0,
            },
            velocity: {
                x: 0,
                y: 0,
            },
        };

        this.debug();

        this.init();
    }



/**
 * 
 * @returns {object} - {width, height}
 */

    getCanvasSizes() {
        return this.curtains.getBoundingRect();
    }

/**
 * linear interpolation
 * @param {*} start 
 * @param {*} end 
 * @param {*} amt 
 * @returns {number} - the lerped value 
 */

    lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }

    /**
     * Assign shaders to the class
     */

    setRipplesShaders() {
        Object.assign(this, {ripplesVs, ripplesFs})
    }

/**
 * Swap read and write passes, apply a new texture
 */

    swapPasses() {
        // swap read and write passes
        var tempFBO = this.readPass;
        this.readPass = this.writePass;
        this.writePass = tempFBO;

        // apply new texture
        this.ripplesTexture.setFromTexture(this.readPass.textures[0]);
    }
  
/**
 * Create a texture where the ripples will be drawn
 * @returns {Promise} - a promise that will be resolved when the ripples texture is created
 */

    createRipplesTexture() {
        // create a texture where the ripples will be drawn
        this.ripplesTexture = this.ripples.createTexture({
            sampler: "uTargetTexture"
        });

        return new Promise((resolve) => {
            if(this.ripplesTexture) {
                resolve();
            }
        });
    }

/**
 * 
 */

    init() {
        // create 2 render targets
        Object.assign(this, {
            readPass:   this.curtains.addRenderTarget({clear:false}),
            writePass:  this.curtains.addRenderTarget({clear:false})
        })

        this.setRipplesShaders();

        let boundingRect = this.getCanvasSizes();

        this.ripplesParams = {
            vertexShader: this.ripplesVs,
            fragmentShader: this.ripplesFs,
            autoloadSources: false, // dont load our webgl canvas!!
            depthTest: false, // we need to disable the depth test in order for the ping pong shading to work
            watchScroll: false,
            uniforms: {
                mousePosition: {
                    name: "uMousePosition",
                    type: "2f",
                    value: [this.mouse.current.x, this.mouse.current.y],
                },
                lastMousePosition: {
                    name: "uLastMousePosition",
                    type: "2f",
                    value: [this.mouse.current.x, this.mouse.current.y],
                },
                velocity: {
                    name: "uVelocity",
                    type: "2f",
                    value: [this.mouse.velocity.x, this.mouse.velocity.y],
                },

                // window aspect ratio to draw a circle
                resolution: {
                    name: "uResolution",
                    type: "2f",
                    value: [boundingRect.width, boundingRect.height],
                },

                time: {
                    name: "uTime",
                    type: "1i",
                    value: -1, 
                },

                viscosity: {
                    name: "uViscosity",
                    type: "1f",
                    value: this.params.viscosity,
                },
                speed: {
                    name: "uSpeed",
                    type: "1f",
                    value: this.params.speed,
                },
                size: {
                    name: "uSize",
                    type: "1f",
                    value: this.params.size,
                },
            },
        };

        this.ripples = this.curtains.addPlane(this.params.container, this.ripplesParams);

        if(this.ripples) {
            this.createRipplesTexture().then(() => {
                if(this.params.callback) {
                    this.params.callback(this.ripplesTexture);
                }
            });

            this.ripples.onReady(() => {
                // add event listeners
                window.addEventListener("mousemove", (e) => this.onMouseMove(e));
                window.addEventListener("touchmove", (e) => this.onMouseMove(e));
            }).onRender(() => {
                let threshold = 1;
                if(this.mouse.velocity.x > threshold) this.mouse.velocity.x = threshold;
                if(this.mouse.velocity.x < -threshold) this.mouse.velocity.x = -threshold;
                if(this.mouse.velocity.y > threshold) this.mouse.velocity.y = threshold;
                if(this.mouse.velocity.y < -threshold) this.mouse.velocity.y = -threshold;
                
                if(this.mouse.velocity.x> 0 || this.mouse.velocity.y > 0){
                    // console.log('after',this.mouse.velocity)    
                }
                this.ripples.uniforms.velocity.value = [this.mouse.velocity.x, this.mouse.velocity.y];

                this.mouse.velocity = {
                    x: this.lerp(this.mouse.velocity.x, 0, 0.1),
                    y: this.lerp(this.mouse.velocity.y, 0, 0.1),
                };
                if(this.mouse.velocity.x> 0 || this.mouse.velocity.y > 0){
                    // console.log('before',this.mouse.velocity)    
                }
                
                
                if(window.verbose)console.log(this.ripples.uniforms.velocity.value);
                this.ripples.uniforms.time.value++;
                
                // update the render target
                this.writePass && this.ripples.setRenderTarget(this.writePass);
                
                this.ripples.uniforms.velocity.value = [this.mouse.velocity.x, this.mouse.velocity.y];
            }).onAfterRender(() => {
                // swap FBOs and update texture
                if(this.readPass && this.writePass) {
                    this.swapPasses();
                }

            }).onAfterResize(() => {
                // update our window aspect ratio uniform
                boundingRect = this.getCanvasSizes();
                this.ripples.uniforms.resolution.value = [boundingRect.width, boundingRect.height];
            });

        }
    }
}

Ripples.prototype.onMouseMove = onMouseMove;
Ripples.prototype.debug = debug;
Ripples.prototype.update = update;