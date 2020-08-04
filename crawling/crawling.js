const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const cateAndUrl = [
    { 
        category: '아우터',
        url: 'https://66girls.co.kr/product/list.html?cate_no=81',
    },
    { 
        category: '상의',
        url: 'https://66girls.co.kr/product/list.html?cate_no=70',
    },
    { 
        category: '셔츠/블라우스',
        url: 'https://66girls.co.kr/product/list.html?cate_no=69',
    },
    { 
        category: '팬츠/데님',
        url: 'https://66girls.co.kr/product/list.html?cate_no=71',
    },
    { 
        category: '스커트',
        url: 'https://66girls.co.kr/product/list.html?cate_no=86',
    },
    { 
        category: '원피스',
        url: 'https://66girls.co.kr/product/list.html?cate_no=233',
    },
]

const promises = cateAndUrl.map(x => crawlingByCategory(x))
Promise.all(promises).then(res => {
    let promises = [];
    res.forEach(x => {
        promises = promises.concat(x)
    })

    return Promise.all(promises).then(res => {
        fs.writeFileSync('data.json', JSON.stringify(res));
    })
})

function crawlingByCategory({ category, url }) {
    return new Promise((resolve, reject) => {
        request.get(url, async function(err, res, body) {
            const result = [];
            const $ = cheerio.load(body);
            const ul = $('.contents_66').children().get(1).children[4].children
    
            for (let i = 0; i < ul.length; i++) {
                const li = ul[i];
                if (li.type === 'tag') {
                    result.push(getData(li, category).then(obj => obj));
                };
            }

            resolve(result);
        })
    })
}

function getData(li, category) {
    return new Promise(function(resolve, reject) {
        const box = li.children[1].children
        const thumbnail = box[1].children[1].children[1].children[0].attribs.src;
        const description = box[3];
        const name = description.children[3].children[0].children[2].children[0].data;
        const priceAndDetail = description.children[5];
        const price = parseInt(priceAndDetail.children[0].children[3].children[0].data.split('').filter(s => {
            if (s !== ',' && s !== '원') return s;
        }).join(''));

        const detail = priceAndDetail.children[2].children[3].children[0].data;
        resolve({ name, price, description: detail, imgUrl: thumbnail, category })
    })
}