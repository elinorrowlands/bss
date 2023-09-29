

/**
 * Assign classes to elements and create new SVGs for each relevant layer.
 * Generic version of function developed in instrument sandbox
 * @param {*} element 
 */

function assignClasses(element=document){
    let HC = {};
    element.querySelectorAll(generateSelector('hc')).forEach((element)=>{
        let noteName = element.id.replace('_Imageremove_hc','');
        let classes = [noteName,'note','hc']; 
        element.classList.add(...classes);
        element.querySelectorAll('path,polygon,polyline').forEach((y,i)=>{
            y.classList.add('note', ...classes);
            y.id = `${noteName}_hc_${i}`;
            y.dataset.note = noteName;
        })
        
        HC[noteName] = element;
    });
    
    element.querySelectorAll(generateSelector('Image')).forEach((imageGroup)=>{
        let noteName = imageGroup.id.replace('_Image','');
        let classes = [noteName, 'note'];
        imageGroup.classList.add(...classes);
        
        let newSVG = imageGroup.parentElement.cloneNode(false);
        let container = imageGroup.parentElement.parentElement || document.body;
    
        newSVG.id = `${noteName}_display`;
        newSVG.classList.remove('background');
        newSVG.appendChild(imageGroup);
        
        container.appendChild(newSVG);
        newSVG.classList.add('note','display',noteName);
    });
}

export default assignClasses;