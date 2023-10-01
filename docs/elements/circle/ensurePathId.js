/** ensure all paths have ids for the multitouch detection
 *  this might be worth moving to the main script...
 */

window.addEventListener('load',()=>{
    const pathsWithoutId = document.querySelectorAll('path:not([id])');
    pathsWithoutId.forEach((element,i)=>{
        element.id = `path_${i}`;
    })
})