/**
 * Replace an object element with its svg content, inline.
 * If the object has not loaded yet, try again every 100ms
 * Match folders if not in root (basic implementation)
 * @param {HTMLElement} objectElement 
 */

const replaceSvgObject = function(objectElement, attributes=['role','aria-label','aria-hidden', 'alt']) {
    let newSvgElement = objectElement.contentDocument.querySelector('svg');
    if (!newSvgElement) {
        console.log('object import failed', objectElement.id)
        return;
    }
    
    if(window.verbose) console.log(`svg loaded from ${objectElement.id}`);
    
    // replace SVG folder name ...
    let folder = objectElement.getAttribute('data').split('/');
    if(folder.length>1){
        folder.pop(); 
        folder = folder.join('/');
        newSvgElement.querySelectorAll('image').forEach(image=>{
            let href = image.getAttribute('href') || image.getAttribute('xlink:href');
            image.removeAttribute('xlink:href');
            image.setAttribute('href', `${folder}/${href}`);
        });
    }
    
    objectElement.classList.forEach(className => {
        newSvgElement.classList.add(className);
    });
    
    newSvgElement.classList.replace('svg-import', 'svg-imported');
    
    newSvgElement.id = `${objectElement.id}`;
     // Transfer attributes from objectElement to newSvgElement
     attributes.forEach(attr => {
        if (objectElement.hasAttribute(attr)) {
            newSvgElement.setAttribute(attr, objectElement.getAttribute(attr));
        }
    });
    
    objectElement.replaceWith(newSvgElement); 
}

/**
 * Replace all selected object elements with their svg content, inline.
 * @param {string} selector
 */

const replaceSvgAll = function (selector='object.svg-import'){
    document.querySelectorAll(selector).forEach(element => {
        replaceSvgObject(element);
    });
}



export { replaceSvgObject, replaceSvgAll }