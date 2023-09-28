/**
 * Place captions on the screen in random positions
 * @param {Object} captionObject 
 */

function placeCaptions(captionObject){
    captionObject.forEach((text,i) => {
        let textElement = document.createElement('div');
        let colourValue = ((12+i)*10)+(Math.random()*(255-((12+i)*10)));
    
        Object.assign(textElement.style,{
            position: 'absolute',
            top: i==0 ? '45%': (5+Math.random()*80)+'%',
            left: i==0 ? '5%':(5+Math.random()*70)+'%',
            fontSize: i==0 ? '50px': (20+Math.random()*30)+'px',
            userSelect: 'none',
            cursor:'pointer',
            color:`rgba(${colourValue},${colourValue},${colourValue},1)`,
            opacity: i==0 ? 1:0.1
        });
        
        textElement.id = `text_${i}`;
        textElement.innerHTML = text.content[0];
        textElement.classList.add('text', 'words');
    
        captionObject.element = textElement;
        document.body.appendChild(textElement);
    });
}

export default placeCaptions;