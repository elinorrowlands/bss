function hexDigitToFloat(hex){
    return parseInt(hex, 16) / 255;
}

function hexToRGB(hex){
    let red = hexDigitToFloat(hex.slice(1,3));
    let green = hexDigitToFloat(hex.slice(3,5));
    let blue = hexDigitToFloat(hex.slice(5,7));
    return([red,green,blue]);
}

function RGBToHSL(red, green, blue){
    let max = Math.max(red, green, blue), min = Math.min(red, green, blue);
    let hue, saturation, lightness = (max + min) / 2;

    if (max == min){

        hue = saturation = 0;

    } else {

        var range = max - min;
        saturation = lightness > 0.5 ? range / (2 - max - min) : range / (max + min);

        switch(max) {

            case red: 
                hue = (green - blue) / range + (green < blue ? 6 : 0); 
                break;
                
            case green: 
                hue = (blue - red) / range + 2; 
                break;

            case blue: 
                hue = (red - green) / range + 4; 
                break;

        }
        
        hue /= 6;
    }

    hue = Math.round(hue*360);

    saturation = Math.round(saturation*100);
    lightness = Math.round(lightness*100);

    return [ hue, saturation, lightness ];
}

function floatToHexDigit(x){
    let output = Math.round(x * 255).toString(16);
    output = output.length === 1 ? `0${output}` : output;
    return output;
};

const hueToChannel = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
};

function HSLToHex(hue, saturation, lightness){
    let rgb;

    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    

    if (saturation === 0) {

        rgb = [lightness, lightness, lightness]

    } else {
        
        const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;

        const red = hueToChannel(p, q, hue + 1 / 3);
        const green = hueToChannel(p, q, hue);
        const blue = hueToChannel(p, q, hue - 1 / 3);

        rgb = [red, green, blue];
    }

    rgb = rgb.map(x=>floatToHexDigit(x));

    const hex = `#${rgb.join('')}`;
    
    return hex;
}