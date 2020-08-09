const loading = makeLoadingAnimation();
loading.start();
getProducts()
// window.addEventListener('scroll', infiniteScroll);

const categoryChips = document.getElementsByClassName('categoryChip');
// 현재 선택된 chip의 상태를 기억하는 변수
let selectedChip;
// calledTime를 클로져로 가지고 있는 selctChip함수를 반환
const selectChip = makeSelectChipFunc();

for (let chip of categoryChips) {
    if (chip.classList.contains('selected')) {
        selectedChip = chip;
    };
    chip.addEventListener('click', (e) => {
        selectChip(e)
    });
}

function makeLoadingAnimation() {
    const loadingArea = document.getElementsByClassName('container')[0];
    const loadingAnimationGIF = document.createElement('img');
    loadingAnimationGIF.src = './loading.gif';
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

function makeProductList(products) {
    const container = document.getElementsByClassName('container')[0];
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    products.forEach(product => {
        // element 생성
        const card = document.createElement('div');
        const img = document.createElement('img');
        const name = document.createElement('div');
        const price = document.createElement('div');
        const description = document.createElement('div');

        // className 설정
        card.className = 'card';
        img.className = 'productImg'
        name.className = 'productName';
        price.className = 'productPrice';
        description.className = 'productDesciption';

        img.setAttribute("data-lazy", product.imgUrl);
        lazyLoad(img);

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

// lazy loading
function lazyLoad(target) {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute("data-lazy");

                img.setAttribute("src", src);
                observer.disconnect();
            }
        })
    })

    io.observe(target);
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

/*
    상품 리스트를 받아오는 함수
    매개변수로 category를 넘기며 
    category에 해당하는 product List를 firebase firestore에서 받아온다.
    매개변수로 아무것도 넘기지 않을 경우 default로 '전체보기'를 category로 적용한다.
*/
function getProducts(category = '전체보기') {
    const promise = new Promise(resolve => {
        if (category === '전체보기') {
            resolve(db.collection('products').get());
        } else {
            resolve(db.collection('products').where("category", "==", category).get());
        }
    })
    return promise.then(querySnapshot => {
        const products = querySnapshot.docs.map(doc => doc.data());
        const DELAY_TIME = 1500;

        // 로딩 애니메이션을 보여주기 위해
        if (!selectedChip) {
            setTimeout(function() {
                loading.end();
                makeProductList(products);
            }, DELAY_TIME);
        } else {
            makeProductList(products);
        }
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

function makeSelectChipFunc() {
    let calledTime;
    return function selectChip(e) {
        const target = e.target;
        const category = target.innerText;
        if (calledTime === undefined) {
            calledTime = e.timeStamp;
        }

        // 현재 선택된 chip을 1.5초 내로 다시 선택한 경우 아무런 행동을 취하지 않는다.
        if (e.timeStamp - calledTime <= 1500 && selectedChip === target) return;
        calledTime = e.timeStamp;

        switchSelectedChip(selectedChip, target);
        getProducts(category);
        scrollToTop();
    }
}

/*  
    다음과 같이 두개의 칩을 매개변수로 받고
    chip1의 class에서 selected를 없애고
    chip2에 새로운 selected를 추가하고
    selectedChip 상태를 chip2로 변경
    chip1 : 현재 selected된 chip 
    chip2 : 새롭게 selected될 chip
*/
function switchSelectedChip(chip1, chip2) {
    const CLASS_NAME = 'selected';
    chip1.classList.remove(CLASS_NAME);
    chip2.classList.add(CLASS_NAME);
    selectedChip = chip2;
}

// 스크롤을 최상단으로 이동시키는 함수
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}