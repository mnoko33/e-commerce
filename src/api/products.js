import { db } from '../../firebase/firebase';

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
    });
    return promise.then(querySnapshot => {
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        });
    })
}

/*
    상품 정보를 받아오는 함수
    매개변수로 productId를 넘기며
    해당 id를 가진 product doc의 정보를 받아온다.
*/
function getProductById(productId) {
    return db.collection('products').doc(productId).get()
        .then(doc => {
            if (doc.exists) {
                return doc.data();
            } else {
                console.log(`doc with id[${productId}] does not exist`);
            }
        });
}

export { getProducts, getProductById }