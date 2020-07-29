getAllProduct(makeProductList);
window.addEventListener('scroll', infiniteScroll);


function makeProductList(products) {
    const productArea = document.getElementsByClassName('products')[0];
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        const title = document.createElement('div');
        const price = document.createElement('div');
        const description = document.createElement('div');
        title.innerText = '제품명 :' + product.title;
        price.innerText = '제품 가격 : \\' + convertWon(product.price);
        description.innerText = product.description;
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(description);
        productArea.appendChild(card);
    })
}

// 가격을 회계형식으로 변경
function convertWon(x) {
    x = String(x).split('').reverse();
    const result = [];
    for (let i = 0; i < x.length; i++) {
        result.push(x[i]);
        if (i > 0 && (i + 1) % 3 ===0 && i !== x.length - 1) {
            result.push(',');
        }
    }
    return result.reverse().join('');
}


// rest api
function getAllProduct(makeProductList) {
    const xhr = new XMLHttpRequest();
    const URL = 'http://localhost:3000/api/e-commerce/products';
    
    xhr.open("GET", URL);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            /* 
                XMLHttpRequest readyState
                0 : request가 초기화가 안된 상태
                1 : 서버에 연결이 완료 된 상태
                2 : 서버가 request를 받은 상태
                3 : 서버가 request를 처리하고 있는 상태
                4 : request처리가 끝나고 response가 준비된 상태
            */
            makeProductList(JSON.parse(xhr.response))
        }
    }
    xhr.send();
}

// 무한 스크롤
function infiniteScroll() {

    function getScrollTop() {
        return (window.pageYOffset !== undefined) 
            ? window.pageYOffset 
            : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }

    function getDocumentHegith() {
        const body = document.body;
        const html = document.documentElement;
        
        return Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        );
    }
    if (getScrollTop() + 50 >= getDocumentHegith() - window.innerHeight) {
        getAllProduct(makeProductList);
    }
}