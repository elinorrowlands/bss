import pug from 'pug';
import fs from 'fs';

let pugFiles = [
    'index', 
    'index_temp',
    'qr',
    'map',
    'map2',
    'about',
    'trail',

    'elements/index',

    'elements/crossing/index',

    'elements/bridge/index',
    
    'elements/rusty_can/index',
    
    'elements/school/index',

    'elements/text/index',

    'elements/ripples/index',
    
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
