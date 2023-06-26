const caption = "1\n00:00:06.420,00:00:08.160\nwhere is the water's edge?\n2\n00:00:11.700,00:00:13.380\nin the wide expanses\n3\n00:00:15.030,00:00:16.950\nor the half filled bathtub\n4\n00:00:19.260,00:00:20.100\nin the river\n5\n00:00:20.580,00:00:21.840\nor the boiling kettle\n6\n00:00:22.770,00:00:23.760\nin the steam\n7\n00:00:23.880,00:00:24.750\nor the snow\n8\n00:00:25.140,00:00:28.170\nor the rainbow mist of a summer hose\n";
const newCaption = ["00:00:06.420,00:00:08.160\nwhere is the water's edge?", '00:00:11.700,00:00:13.380\nin the wide expanses', '00:00:15.030,00:00:16.950\nor the half filled bathtub', '00:00:19.260,00:00:20.100\nin the river', '00:00:20.580,00:00:21.840\nor the boiling kettle', '00:00:22.770,00:00:23.760\nin the steam', '00:00:23.880,00:00:24.750\nor the snow', '00:00:25.140,00:00:28.170\nor the rainbow mist of a summer hose'];
let captionObject = syncCC.splitCaptions(newCaption);
console.log(captionObject);
let justText = captionObject.map(text => text.content[0]);
justText.forEach(text => {
    let textElement = document.createElement('div');
    Object.assign(textElement.style,{
        position: 'absolute',
        top: (5+Math.random()*80)+'%',
        left: (5+Math.random()*80)+'%',
        fontSize: (10+Math.random()*30)+'px',
    })
    textElement.innerHTML = text;
    document.body.appendChild(textElement);
});