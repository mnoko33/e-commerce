export { makeLoadingAnimation }
import loadingAnimation from '../../images/loading.gif';


function makeLoadingAnimation() {
    const loadingArea = document.getElementsByClassName('container')[0];
    const loadingAnimationGIF = document.createElement('img');
    loadingAnimationGIF.src = loadingAnimation;
    loadingAnimationGIF.setAttribute("style", "width: 800px; display: block; margin: 0px auto;");

    return {
        start: function() {
            loadingArea.appendChild(loadingAnimationGIF);
        },
        end: function() {
            loadingArea.removeChild(loadingArea.firstChild);
        }
    }
}