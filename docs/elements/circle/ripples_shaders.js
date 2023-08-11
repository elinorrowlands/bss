// todo: save these as .glsl files for legibility, script to import and compile

const ripplesVs = `
        #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
        #else
        precision mediump float;
        #endif

        // default mandatory variables
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;

        // custom variables
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;

        void main() {

            vec3 vertexPosition = aVertexPosition;

            gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

            // varyings
            vTextureCoord = aTextureCoord;
            vVertexPosition = vertexPosition;
        }
    `;

const ripplesFs = `
        #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
        #else
        precision mediump float;
        #endif

        uniform vec2 uResolution;
        uniform vec2 uMousePosition;
        uniform vec2 uLastMousePosition;
        uniform vec2 uVelocity;
        uniform int uTime;
        uniform sampler2D uTargetTexture;
        
        uniform float uViscosity;
        uniform float uSpeed;
        uniform float uSize;
        
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;
        
        // line distance field
        float sdLine( vec2 p, vec2 a, vec2 b ){
            float velocity = clamp(length(uVelocity), 0.5, 1.5);
            vec2 pa = p - a, ba = b - a;
            float h = clamp( dot(pa, ba)/dot(ba, ba), 0.0, 1.0 );
            return length( pa - ba*h ) / velocity;
        }

        
        void main() {
            float velocity = clamp(length(uVelocity), 0.1, 1.0);
            vec3 speed = vec3(vec2(uSpeed) / uResolution.xy, 0.0);
                        
            vec2 mouse = (uMousePosition + 1.0) * 0.5;
            vec2 lastMouse = (uLastMousePosition + 1.0) * 0.5;            

            vec4 color = texture2D(uTargetTexture, vTextureCoord);
            
            // trick given by Edan Kwan on this codepen: https://codepen.io/edankwan/pen/YzXgxxr
            // "It is always better to use line distance field instead of single point distance for ripple drawing. And it is cheap and simple."
            //float shade = smoothstep(0.02 * uSize * velocity, 0.0, length(mouse - vTextureCoord));
            float shade = smoothstep(0.02 * uSize * velocity, 0.0, sdLine(vTextureCoord, lastMouse, mouse));        
        
            vec4 texelColor = color;
            
            float d = shade * uViscosity;
            
            float top = texture2D(uTargetTexture, vTextureCoord - speed.zy, 1.0).x;
            float right = texture2D(uTargetTexture, vTextureCoord - speed.xz, 1.0).x;
            float bottom = texture2D(uTargetTexture, vTextureCoord + speed.xz, 1.0).x;
            float left = texture2D(uTargetTexture, vTextureCoord + speed.zy, 1.0).x;
            
            d += -(texelColor.y - 0.5) * 2.0 + (top + right + bottom + left - 2.0);
            d *= 0.99;
            
            // skip first frames
            d *= float(uTime > 5);
            
            d = d * 0.5 + 0.5;
            
            color = vec4(d, texelColor.x, 0.0, 1.0);
        
            gl_FragColor = color;
        }
    `;

    export { ripplesFs, ripplesVs}