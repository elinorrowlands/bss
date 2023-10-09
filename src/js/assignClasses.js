

/**
 * Assign classes to elements and create new SVGs for each relevant layer.
 * Generic version of function developed in instrument sandbox
 * @param {HTMLObject} element svg element
 * @param {boolean} copyMasks whether to copy masks or not -- this works with a specific gradient masking setup I use. cm
 */

function assignClasses(element=document, copyMasks = false, bringParent = false){
    // console.log('assignClasses',element)
    let HC = {};
    if(!element.querySelectorAll('.hc, .pickup').length){
        console.log('no hc')
        let groupsContainingPaths = document.querySelectorAll('g[id*="_hc"]');
        groupsContainingPaths.forEach(g=>g.classList.add('hc'));
    };
    element.querySelectorAll('.hc, .pickup').forEach((hcElement)=>{
        // console.log(hcElement)
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
    
    element.querySelectorAll('image').forEach((imageGroup)=>{
        if(bringParent) imageGroup = imageGroup.parentElement;
        console.log('noteName',noteName)
        console.log('imageGroup',imageGroup)
        let noteName = imageGroup.id.replace('_Image','');
        let classes = [noteName, 'note'];
        
        imageGroup.classList.add(...classes);
        
        // console.log(imageGroup.id, imageGroup.parentElement.parentElement.parentElement.parentElement);
        
        // if(imageGroup.parentElement.getAttribute('tagname')) console.log('.')
        let containerElement = imageGroup;
        do {
            containerElement = containerElement.parentElement;
        } while (containerElement.tagName !== 'svg');
        // containerElement = containerElement.parentElement;
        
        // console.log('containerElement', containerElement)
        
        let newSVG = containerElement.cloneNode(false);
        let masks = [];
        newSVG.id = `${noteName}_display`;
        newSVG.classList.remove('background');
        newSVG.classList.add('note','display',noteName);
        
        if(copyMasks){
            // console.log('mask group',containerElement.querySelector('g.mask__edges'));
            masks.push(containerElement.querySelector('g.mask__edges').cloneNode(false));
            masks.push(containerElement.querySelector('g.mask__edges g.mask__edges').cloneNode(false))
            masks[0].appendChild(masks[1]);
            masks[1].appendChild(imageGroup);
            newSVG.appendChild(masks[0]);
            // console.log(imageGroup)
        } else {
            newSVG.appendChild(imageGroup);
        }
        
        let container = containerElement.parentElement || document.body;
        
        container.appendChild(newSVG);
    });
}

export default assignClasses;