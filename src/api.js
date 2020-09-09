const dummyMode = false;

function delay () {
  const delayTimeMs = getRandomDelayTime()
  return new Promise(resolve => {
    setTimeout(() => resolve() , delayTimeMs);
  }) 
}

const api = {
  getProducts: async category => {
      if (dummyMode) {
        await delay();
        return new Promise(resolve => {
          resolve(dummyData.map((product, idx) => {
            return { ...product, id: idx }
          }))
        })
      }
      await delay();
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

  getProductById: async pid => {
    if (dummyMode) {
      return new Promise(resolve => {
        resolve({ ...dummyData[pid], id: pid });
      })
    }
    return db.collection('products').doc(`${pid}`).get()
      .then(doc => {
        if (doc.exists) {
          return { ...doc.data(), id: doc.id };
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
