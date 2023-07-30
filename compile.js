import pug from 'pug';
import fs from 'fs';

let pugFiles = [
    'index', 
    'qr',
    'map',
    'map2',
    'elements/index',
    'elements/mix/index',
    'elements/mix/checkboxes',
    'elements/mix/mix_ripple',
    'elements/bridge/index',
    'elements/text/index'
];

let pugSourceFolder = './src/pug';
let pugOutputFolder = './docs';

for (let file of pugFiles){
    var htmlOutput = pug.render(fs.readFileSync(
        `${pugSourceFolder}/${file}.pug`, "utf-8"), {
            filename: `${pugSourceFolder}/${file}.pug`,
            pretty: true
        }
    )
    
    fs.writeFileSync(`${pugOutputFolder}/${file}.html`, htmlOutput, "utf-8");
}
