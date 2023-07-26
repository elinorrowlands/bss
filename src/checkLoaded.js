export default function checkLoaded(name) {
    const interval = 100;
    window.setTimeout(function() {
        if (window[name]) {
            window[name]();
        } else {
            checkLoaded(name);
        }
    }, interval);
}