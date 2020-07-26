getAllProduct(makeProductList);

function makeProductList(products) {
    const productArea = document.getElementsByClassName('products')[0];
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        const title = document.createElement('div');
        const price = document.createElement('div');
        const description = document.createElement('div');
        title.innerText = '제품명 :' + product.title;
        price.innerText = '제품 가격 : $' + product.price;
        description.innerText = product.description;
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(description);
        productArea.appendChild(card);
    })
}

// https://fakestoreapi.com/docs
function getAllProduct(makeProductList) {
    const xhr = new XMLHttpRequest();
    const URL = 'https://fakestoreapi.com/products';
    
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
            // return JSON.parse(xhr.response);
        }
    }
    xhr.send();
}