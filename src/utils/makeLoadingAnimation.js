export { makeLoadingAnimation }

function makeLoadingAnimation() {
    const loadingArea = document.getElementsByClassName('container')[0];
    const loadingAnimationGIF = document.createElement('img');
    loadingAnimationGIF.src = './images/loading.gif';
    loadingAnimationGIF.setAttribute("style", "width: 800px; display: block; margin: 0px auto;")

    return {
        start: function() {
            loadingArea.appendChild(loadingAnimationGIF);
        },
        end: function() {
            loadingArea.removeChild(loadingArea.firstChild);
        }
    }
}