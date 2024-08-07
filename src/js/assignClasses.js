

/**
 * Assign classes to elements and create new SVGs for each relevant layer.
 * Generic version of function developed in instrument sandbox
 * @param {HTMLObject} element svg element
 * @param {boolean} copyMasks whether to copy masks or not -- this works with a specific gradient masking setup I use. cm
 */

function assignClasses(element=document, copyMasks = false, bringParent = false){
    let HC = {};
    if(!element.querySelectorAll('.hc, .pickup').length){
        if(window.verbose)console.log('no hc')
        let groupsContainingPaths = document.querySelectorAll('g[id*="_hc"]');
        groupsContainingPaths.forEach(g=>g.classList.add('hc'));
        if(window.verbose)console.log(document.querySelectorAll('.hc'))
    };
    element.querySelectorAll('.hc, .pickup').forEach((hcElement)=>{
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
    
    element.querySelectorAll('image').forEach((imageGroup,i)=>{
        if(bringParent) imageGroup = imageGroup.parentElement;
        if(window.verbose)console.log('imageGroup',imageGroup)
        if(!imageGroup.id) imageGroup.id = 'note_Image_1'
        let noteName = imageGroup.id.replace('_Image','');
        if(window.verbose)console.log('noteName',noteName)
        let classes = [noteName, 'note'];
        
        imageGroup.classList.add(...classes);
        
        
        let containerElement = imageGroup;
        do {
            containerElement = containerElement.parentElement;
        } while (containerElement.tagName !== 'svg');
        
        let newSVG = containerElement.cloneNode(false);
        let masks = [];
        newSVG.id = `${noteName}_display`;
        newSVG.classList.remove('background');
        newSVG.classList.add('note','display',noteName);
        
        if(copyMasks){
            
            masks.push(containerElement.querySelector('g.mask__edges').cloneNode(false));
            masks.push(containerElement.querySelector('g.mask__edges g.mask__edges').cloneNode(false))
            masks[0].appendChild(masks[1]);
            masks[1].appendChild(imageGroup);
            newSVG.appendChild(masks[0]);
            
        } else {
            newSVG.appendChild(imageGroup);
        }
        
        let container = containerElement.parentElement || document.body;
        
        container.appendChild(newSVG);
    });
}

export default assignClasses;