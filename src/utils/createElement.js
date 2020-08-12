export { createElement };

function createElement(props) {
    if (!props) throw 'at least 1 props is need';
    const elem = document.createElement(props.tagName ? props.tagName : 'div');
    // className 설정
    if (props.class) {
        if (typeof props.class === 'object') {
            props.class.forEach(className => {
                elem.classList.add(className);
            })    
        } else {
            elem.className = props.class;
        }
    }
    // id 설정
    if (props.id) {
        elem.id = props.id;
    }
    // src 설정
    if (props.src) {
        elem.src = props.src;
    }
    // style 설정
    if (props.style) {
        elem.setAttribute("style", Object.entries(props.style).map(([k, v]) => `${k}: ${v};`).join(' '));
    }

    return elem;
}