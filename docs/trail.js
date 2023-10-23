window.addEventListener('load', () => {
    var iframeElement   = document.querySelector('iframe');
    // var iframeElementID = iframeElement.id;
    window.widget       = SC.Widget(iframeElement);
    
    setInterval(function(){ 
                widget.getPosition(function(position) {
                    
                    widget.getDuration(function(duration) {
                      percent = position * 100 / duration;
                      console.log(position, percent);
            });
       })
    },1000); //Interval in ms  
    
});

