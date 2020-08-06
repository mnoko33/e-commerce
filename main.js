getAllProduct(makeProductList);
// window.addEventListener('scroll', infiniteScroll);


function makeProductList(products) {
    const container = document.getElementsByClassName('container')[0];
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        const img = document.createElement('img');
        const name = document.createElement('div');
        const price = document.createElement('div');
        const description = document.createElement('div');
        img.src = product.imgUrl;
        name.innerText = '제품명 :' + product.name;
        price.innerText = '제품 가격 : \\' + convertWon(product.price);
        description.innerText = product.description;
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(description);
        container.appendChild(card);
    })
}

// 가격을 회계형식으로 변경
function convertWon(x) {
    x = String(x);
    let result = '';
    const N = x.length;
    for (let i = 0; i < N; i++) {
        result += x[i];
        if ((N - i - 1) % 3 === 0 && i < N - 1) {
            result += ',';
        }
    }
    return result;
}

// rest api
function getAllProduct(makeProductList) {
    return db.collection('products').get()
        .then(querySnapshot => {
            const products = querySnapshot.docs.map(doc => doc.data())
            makeProductList(products)
        })
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