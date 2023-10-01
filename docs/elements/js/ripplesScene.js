import Ripples from './ripples.js'
import writeTitleCanvas from './ripples_writeTitleCanvas.js'

const useText = false;

/*** 
This is the class that renders the whole scene (tiles texture and title) and apply the texture returned by our Ripples class to create ripples
***/
export default class RipplesScene {

    constructor({
        viscosity = 2.7,
        speed = 1.6,
        size = 0.5,

        displacementStrength = 4,
        lightIntensity = 5,
        shadowIntensity = 2.5,
    } = {}) {

        this.params = {
            viscosity: viscosity,
            speed: speed,
            size: size,

            displacementStrength: displacementStrength,
            lightIntensity: lightIntensity,
            shadowIntensity: shadowIntensity,
        };

        this.init();
    }

    debug() {
        this.sceneGui = this.gui.addFolder('Scene');
        this.sceneGui.open();

        this.guiDisplacement = this.sceneGui.add(this.guiParams, 'displacement', 0 , 5);
        this.guiLights = this.sceneGui.add(this.guiParams, 'lights', 0.1, 10);
        this.guiShadows = this.sceneGui.add(this.guiParams, 'shadows', 0.1, 10);

        this.guiBlurRipples = this.sceneGui.add(this.guiParams, 'blurRipples', true);
        this.guiShowTexture = this.sceneGui.add(this.guiParams, 'showTexture', true);
        this.guiTitleColor = this.sceneGui.addColor(this.guiParams, 'titleColor');

        let parameters = ['displacement', 'lights', 'shadows', 'blurRipples', 'showTexture', 'titleColor'];

        parameters.forEach((parameter) => {
            this.sceneGui.__controllers.forEach((controller) => {
                controller.onChange((value) => {
                    this.guiParams[parameter] = value;
                });
            });
        });
        // this.guiDisplacement.onChange((value) => {
        //     if(this.scenePlane) {
        //         this.scenePlane.uniforms.displacementStrength.value = value;
        //     }
        // });

        // this.guiLights.onChange((value) => {
        //     if(this.scenePlane) {
        //         this.scenePlane.uniforms.lightIntensity.value = value;
        //     }
        // });

        // this.guiShadows.onChange((value) => {
        //     if(this.scenePlane) {
        //         this.scenePlane.uniforms.shadowIntensity.value = value;
        //     }
        // });

        // this.guiBlurRipples.onChange((value) => {
        //     if(this.scenePlane) {
        //         this.scenePlane.uniforms.blurRipples.value = value ? 1 : 0;
        //     }
        // });

        // this.guiShowTexture.onChange((value) => {
        //     if(this.scenePlane) {
        //         this.scenePlane.uniforms.showTexture.value = value ? 1 : 0;
        //     }
        // });

        // this.guiTitleColor.onChange((value) => {
        //     if(this.scenePlane) {
        //         this.scenePlane.uniforms.titleColor.value = value;
        //     }
        // });
    }

    init() {
        // set up the webgl context
        this.curtains = new Curtains({
            container: "canvas",
            alpha: false, // we don't need alpha, and setting it to false will improve our text canvas texture rendering
        }).onError(() => {
            // we will add a class to the document body to display original image and title
            document.body.classList.add("no-curtains");
        }).onContextLost(() => {
            // on context lost, try to restore the context
            this.curtains.restoreContext();
        });

        this.setSceneShaders();

        // we'll be using this html element to create 2 planes
        this.sceneElement = document.getElementById("water-ripples");

        // debugging
        // DAT gui
        this.guiParams = {
            displacement: this.params.displacementStrength,
            lights: this.params.lightIntensity,
            shadows: this.params.shadowIntensity,

            blurRipples: true,
            showTexture: true,
            titleColor: [255, 255, 255],
        };

        this.gui = new dat.GUI();

        this.ripples = new Ripples({
            curtains: this.curtains,
            container: this.sceneElement,
            viscosity: this.params.viscosity || null,
            speed: this.params.speed || null,
            size: this.params.size || null,
            callback: (texture) => {
                this.createScenePlane(texture);
            },

            gui: this.gui || null,
            guiParams: this.guiParams || null,
        });

        // dat gui
        this.debug();
    }

    setSceneShaders() {
        this.sceneVs = `
            precision highp float;
            
            // default mandatory variables
            attribute vec3 aVertexPosition;
            attribute vec2 aTextureCoord;
            
            uniform mat4 uMVMatrix;
            uniform mat4 uPMatrix;
            
            // varyings
            varying vec3 vVertexPosition;
            varying vec2 vTextureCoord;
            varying vec2 vPlaneTextureCoord;
            
            // textures matrices
            uniform mat4 planeTextureMatrix;
    
            void main() {
                gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
                
                // varyings
                vTextureCoord = aTextureCoord;
                vPlaneTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
                vVertexPosition = aVertexPosition;
            }
        `;

        this.sceneFs = `
            precision highp float;
            
            // varyings
            varying vec3 vVertexPosition;
            varying vec2 vTextureCoord;
            varying vec2 vPlaneTextureCoord;
            
            uniform sampler2D uRippleTexture;
            uniform sampler2D planeTexture;
            uniform sampler2D titleTexture;
            
            uniform vec2 uResolution;
            
            uniform float uDisplacementStrength;
            uniform float uLightIntensity;
            uniform float uShadowIntensity;
            
            uniform float uBlurRipples;
            uniform float uShowTexture;
            uniform vec3 uTitleColor;
            
            
            // fresnel!
            const float bias = 0.2;
            const float scale = 10.0;
            const float power = 10.1;
            
            // taken from https://github.com/Jam3/glsl-fast-gaussian-blur
            vec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
                vec4 color = vec4(0.0);
                vec2 off1 = vec2(1.3333333333333333) * direction;
                color += texture2D(image, uv) * 0.29411764705882354;
                color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;
                color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;
                return color;
            }
            
            float bumpMap(vec2 uv, float height, inout vec3 colormap) {
                vec3 shade;
                // branching on an uniform is OK
                if(uBlurRipples == 1.0) {
                    shade = blur5(uRippleTexture, vTextureCoord, uResolution, vec2(1.0, 1.0)).rgb;
                }
                else {
                    shade = texture2D(uRippleTexture, vTextureCoord).rgb;
                }
                
                return 1.0 - shade.r * height;
            }
            
            float bumpMap(vec2 uv, float height) {
                vec3 colormap;
                return bumpMap(uv, height, colormap);
            }
    
            // add bump map, reflections and lightnings to the ripples render target texture
            vec4 renderPass(vec2 uv, inout float distortion) {
                vec3 surfacePos = vec3(uv, 0.0);
                vec3 ray = normalize(vec3(uv, 1.0));
    
                vec3 lightPos = vec3( 2.0, 3.0, -3.0);
                vec3 normal = vec3(0.0, 0.0, -1);
                
                vec2 sampleDistance = vec2(0.005, 0.0);
                
                vec3 colormap;
                
                float fx = bumpMap(sampleDistance.xy, 0.2);
                float fy = bumpMap(sampleDistance.yx, 0.2);
                float f = bumpMap(vec2(0.0), 0.2, colormap);
                
                distortion = f;
                
                fx = (fx - f) / sampleDistance.x;
                fy = (fy - f) / sampleDistance.x;
                normal = normalize(normal + vec3(fx, fy, 0.0) * 0.2);
                
                // fresnel!
                float shade = bias + (scale * pow(1.0 + dot(normalize(surfacePos - vec3(uv, -3.0)), normal), power));
                
                vec3 lightV = lightPos - surfacePos;
                float lightDist = max(length(lightV), 0.001);
                lightV /= lightDist;
                
                // light color based on light intensity
                vec3 lightColor = vec3(1.0 - uLightIntensity / 20.0);
                
                float shininess = 0.1;
                // brightness also based on light intensity
                float brightness = 1.0 - uLightIntensity / 40.0;
                
                float falloff = 0.1;
                // finally attenuation based on light intensity as well
                float attenuation = (0.75 + uLightIntensity / 40.0) / (1.0 + lightDist * lightDist * falloff);
                
                float diffuse = max(dot(normal, lightV), 0.0);
                float specular = pow(max(dot( reflect(-lightV, normal), -ray), 0.0), 15.0) * shininess;
                
                vec3 reflect_ray = reflect(vec3(uv, 1.0), normal * 1.0);
                vec3 texCol = (vec3(0.5) * brightness);
                
                float metalness = (1.0 - colormap.x);
                metalness *= metalness;
                
                vec3 color = (texCol * (diffuse * vec3(0.9) * 2.0 + 0.5) + lightColor * specular * f * 2.0 * metalness) * attenuation * 2.0;
    
                return vec4(color, 1.0);
            }
    
    
            void main() {
                vec4 color = vec4(1.0);
                
                float distortion;
                vec4 reflections = renderPass(vTextureCoord, distortion);            
                
                vec4 ripples = vec4(0.16);            
                ripples += distortion * 0.1 - 0.1;
                ripples += reflections * 0.7;
                
                
                vec2 textureCoords = vTextureCoord + distortion * (uDisplacementStrength / 250.0);
                vec2 planeTextureCoords = vPlaneTextureCoord + distortion * (uDisplacementStrength / 250.0);
                
                vec4 texture = texture2D(planeTexture, planeTextureCoords);
                vec4 title = texture2D(titleTexture, textureCoords);
                title.rgb *= vec3(uTitleColor.r / 255.0, uTitleColor.g / 255.0, uTitleColor.b / 255.0);
                
                // mix texture and title
                color = mix(vec4(0.05, 0.05, 0.05, 1.0), texture, uShowTexture);
                color = mix(color, title, title.a);
    
                
                // add fake lights & shadows
                float lights = max(0.0, ripples.r - 0.5);
                color.rgb += lights * (uLightIntensity / 10.0);
                
                float shadow = max(0.0, 1.0 - (ripples.r + 0.5));
                color.rgb -= shadow * (uShadowIntensity / 10.0);
                
                gl_FragColor = color;
            }
        `;
    }

    

    createScenePlane(rippleTexture) {
        // next we will create the plane that will display our result
        let curtainsBBox = this.curtains.getBoundingRect();

        const params = {
            vertexShader: this.sceneVs,
            fragmentShader: this.sceneFs,
            uniforms: {
                resolution: {
                    name: "uResolution",
                    type: "2f",
                    value: [curtainsBBox.width, curtainsBBox.height],
                },

                displacementStrength: {
                    name: "uDisplacementStrength",
                    type: "1f",
                    value: this.params.displacementStrength,
                },
                lightIntensity: {
                    name: "uLightIntensity",
                    type: "1f",
                    value: this.params.lightIntensity,
                },
                shadowIntensity: {
                    name: "uShadowIntensity",
                    type: "1f",
                    value: this.params.shadowIntensity,
                },

                blurRipples: {
                    name: "uBlurRipples",
                    type: "1f",
                    value: 1,
                },

                showTexture: {
                    name: "uShowTexture",
                    type: "1f",
                    value: 1,
                },
                titleColor: {
                    name: "uTitleColor",
                    type: "3f",
                    value: [255, 255, 255],
                },
            }
        };

        this.scenePlane = this.curtains.addPlane(this.sceneElement, params);

        // if the plane has been created
        if(this.scenePlane) {
            const canvas = document.createElement("canvas");

            canvas.setAttribute("data-sampler", "titleTexture");
            canvas.style.display = "none";
            canvas.setAttribute('id', 'ripples__canvas')

            this.scenePlane.loadCanvas(canvas);

            this.scenePlane.onLoading((texture) => {
                texture.shouldUpdate = false;
                if(useText && this.scenePlane.canvases && this.scenePlane.canvases.length > 0) {
                    // title
                    if(document.fonts) {
                        document.fonts.ready.then(() => {
                            this.writeTitleCanvas(canvas);
                        });
                    }
                    else {
                        setTimeout(() => {
                            this.writeTitleCanvas(canvas);
                        }, 750);
                    }
                }

            }).onReady(() => {

                // create a texture that will hold our flowmap
                this.scenePlane.createTexture({
                    sampler: "uRippleTexture",
                    fromTexture: rippleTexture // set it based on our ripples plane's texture
                });

            }).onAfterResize(() => {
                curtainsBBox = this.curtains.getBoundingRect();
                this.scenePlane.uniforms.resolution.value = [curtainsBBox.width, curtainsBBox.height];

                this.writeTitleCanvas(canvas);
            });
        }
    }
}

RipplesScene.prototype.writeTitleCanvas = writeTitleCanvas;