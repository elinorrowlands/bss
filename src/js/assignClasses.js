

/**
 * Assign classes to elements and create new SVGs for each relevant layer.
 * Generic version of function developed in instrument sandbox
 * @param {HTMLObject} element svg element
 */

function assignClasses(element=document){
    let HC = {};
    element.querySelectorAll('.hc, .pickup').forEach((hcElement)=>{
        console.log(hcElement)
        let noteName = hcElement.id.replace('_Imageremove_hc','');
        let classes = [noteName,'note','hc']; 
        hcElement.classList.add(...classes);
        hcElement.querySelectorAll('path,polygon,polyline').forEach((y,i)=>{
            y.classList.add('note', ...classes);
            y.id = `${noteName}_hc_${i}`;
            y.dataset.note = noteName;
        })
        
        HC[noteName] = hcElement;
    });
    console.log(HC);
    element.querySelectorAll('Image').forEach((imageGroup)=>{
        let noteName = imageGroup.id.replace('_Image','');
        let classes = [noteName, 'note'];
        imageGroup.classList.add(...classes);
        console.log(imageGroup, imageGroup.parentElement)
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