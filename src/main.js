import '../stylesheets/main.css';
import {createModal} from './utils/createModal';
import {convertWon} from './utils/convertWon';
import {lazyLoad} from './utils/lazyload';
import {scrollToTop} from './utils/scroll';
import {makeLoadingAnimation} from './utils/makeLoadingAnimation';
// import { createElement } from './utils/createElement';
import {getProductById, getProducts} from './api/products';

const loading = makeLoadingAnimation();
loading.start();
getProducts()
    .then(products => {
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
    });

const container = document.getElementsByClassName('container')[0];
container.addEventListener("click", function(e) {
    if (e.target.className === "productImg") {
        const productId = e.target.parentNode.dataset.id;
        getProductById(productId).then(product => {
            const content = createModalContent(product);
            const props = {
                title: product['name'],
                btn: {
                    confirm: "구매하기",
                    cancel: "취소하기"
                },
                content: content,
                callback: function() {
                    /* 
                        id로 firestore에서 데이터를 받아오고
                        이를 modal에 content 부분에 넣어주는 로직 필요
                    */
                    console.log('callback :', e.target.parentNode.dataset.id);
                }
            };
            createModal(props)
        })
    }
});
// window.addEventListener('scroll', infiniteScroll);

const categoryChips = document.getElementsByClassName('categoryChip');
// 현재 선택된 chip의 상태를 기억하는 변수
let selectedChip;
// calledTime를 클로져로 가지고 있는 selctChip함수를 반환
const selectChip = makeSelectChipFunc();

for (let chip of categoryChips) {
    if (chip.classList.contains('selected')) {
        selectedChip = chip;
    }
    chip.addEventListener('click', e => selectChip(e));
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
        card.setAttribute("data-id", product.id);
        img.className = 'productImg';
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
        getProducts(category).then(products => makeProductList(products));
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

function createModalContent(product) {
    const container = document.createElement('div');
    container.setAttribute("style", "width: 100%; display: flex; background-color: black;");

    // img
    const imgArea = document.createElement('div');
    const img = document.createElement('img');
    img.src = product.imgUrl;
    img.style.width = '100%';
    imgArea.appendChild(img);
    imgArea.setAttribute("style", "width: 40%; margin: 0 5%; background-color: yellow;");

    // content info
    const contentArea = document.createElement('div');
    contentArea.setAttribute("style", "width: 40%; margin: 0 5%; background-color: red;");

    container.appendChild(imgArea);
    container.appendChild(contentArea);
    return container;
}