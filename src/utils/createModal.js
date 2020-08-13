export { createModal };

/*
    props: {
        "title": "This is Modal",   // 모달의 제목
        "width": "100px",           // 모달의 width | default == 800px
        "height": "100px",          // 모달의 height | default == 500px
        "btn": {
            "confirm": "확인",      // 모달 확인 버튼 텍스트 | default == confirm
            "cancel": "취소",       // 모달 취소 버튼 텍스트 | default == cancel
        },
        "content": [Node element]               // 모달 body에 들어갈 content
        "persistent": true,         // 배경을 눌러도 모달이 닫히는지 여부 | default == false
        "callback": func,           // 확인 버튼을 눌렀을 때 실행할 callback 함수
    }
*/
function createModal(props = {}) {
    const body = document.body;
    // DEFAULT VALUE
    const DEFAULT_VALUE = {
        width: '800px',
        height: '500px',
        confirmBtn: "confirm",
        cancelBtn: "cancel",
    };

    // window의 scroll을 발생시키는 events
    const events = [
        'keydown',
        "onwheel" in document ? "wheel" : "mousewheel"
    ];
    const scrollHandler = e => {
        if (e === "onwheel" in document ? "wheel" : "mousewheel" || (e === 'keydown' && (e.which === 38 || e.which === 40))) {
            e.preventDefault();
        }
    };

    // modal 본체
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute("style", `min-width: ${props.width ? props.width : DEFAULT_VALUE.width}; 
                                min-height: ${props.height ? props.height : DEFAULT_VALUE.height}; 
                                background-color: #ffffff; 
                                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                                z-index: 100000;
                                border-radius: 10px;`);
    
    const modalHeader = document.createElement('div');
    if (props.title) {
        modalHeader.innerText = props.title;
    }
    // 모달 Header 부분
    modalHeader.setAttribute("style", "height: 60px; margin: 20px; font-size: 40px; font-weight: bold;");
    const modalBody = document.createElement('div'); 
    const modalFooter = document.createElement('div');

    // 모달 Body 부분
    modalBody.setAttribute("style", "margin: 20px; min-height: calc(100% - 200px);");

    if (props.content) {
        modalBody.appendChild(props.content);
    }


    // 모달 Footer 부분
    modalFooter.setAttribute("style", "height: 80px; margin: 20px 20px 0 20px; display: flex; justify-content: flex-end; border-top: solid black 1px; align-items: center;");
    const removeModal = () => {
        body.removeChild(modal);
        body.removeChild(bg);
        body.style.overflow = 'visible';
        events.forEach(event => window.removeEventListener(event, scrollHandler, {passive: false}));
    };
    const confirmBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');
    const btnStyle = "width: 100px; height: 30px; margin: 10px; font-weight: bold;";

    // confirm & cancel 버튼
    confirmBtn.setAttribute("style", btnStyle);
    confirmBtn.innerText = props.btn ? props.btn.confirm : DEFAULT_VALUE.confirmBtn;
    confirmBtn.addEventListener("click", function() {
        if (props.callback) props.callback();
        removeModal()
    });

    cancelBtn.setAttribute("style", btnStyle);
    cancelBtn.innerText = props.btn ? props.btn.cancel : DEFAULT_VALUE.cancelBtn;
    cancelBtn.addEventListener("click", function() {
        removeModal()
    });

    modalFooter.appendChild(cancelBtn);
    modalFooter.appendChild(confirmBtn);

    modal.appendChild(modalHeader);
    modal.appendChild(modalBody);
    modal.appendChild(modalFooter);
    body.appendChild(modal);

    // 배경
    const bg = document.createElement('div');
    bg.classNAme = 'bg';
    bg.setAttribute("style", "background-color: black; opacity: 0.8; width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 99999");
    bg.addEventListener("click", function() {
        if (props.persistent === undefined || props.persistent === false) {
            removeModal();
        } else {
            const width = props.width ? props.width : DEFAULT_VALUE.width;
            const height = props.height ? props.height : DEFAULT_VALUE.height;
            const VALUE = 10;
            modal.style.width = `${parseInt(width.slice(0, -2)) + VALUE}px`;
            modal.style.height = `${parseInt(height.slice(0, -2)) + VALUE}px`;
            setTimeout(() => {
                modal.style.width = width;
                modal.style.height = height;
            }, 50)
        }
    });
    body.appendChild(bg);
    body.style.overflow = "hidden";
    events.forEach(event => window.addEventListener(event, scrollHandler, {passive: false}));
}