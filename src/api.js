const dummyMode = false;

const api = {
    getProducts: category => {
        if (dummyMode) {
            return new Promise(resolve => {
                resolve(dummyData.map((product, idx) => {
                    return { ...product, id: idx }
                }))
            })
        }
        return new Promise((resolve) => {
            if (category === '전체보기') {
                resolve(db.collection('products').get());
            } else {
                resolve(db.collection('products').where("category", "==", category).get());
            }
        })
        .then(querySnapshot => {
            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            })
        })
        .catch(err => {
            console.error(err);
            return dummyData.map((product, idx) => {
                        return { ...product, id: idx }
                    });
        })
    },

    getProductById: pid => {
        return db.collection('products').doc(productId).get()
            .then(doc => {
                if (doc.exists) {
                    return doc.data();
                } else {
                    console.error(`doc id ${pid} does not exist`);
                }
            })
            .catch(err => {
                console.error(err);
                return dummyData[0];
            })
    }
}

var dummyData = [
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터터터터터터터터터터터터터터터터터터터터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터터터터터터터터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터터터터터터터터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
    {
        category: "더미데이터",
        description: "더미데이터",
        price: 10000,
        imgUrl: "//66girls.co.kr/web/product/medium/20200511/b6d952838940fbe3fe640e54ff4c79da.gif",
        name: "더미데이터",
    },
]
