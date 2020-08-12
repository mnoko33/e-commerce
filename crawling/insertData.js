// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDR5UFZqhtz2QyYofFSemQHBoFQW341CSs",
    authDomain: "e-commerce-3ee1f.firebaseapp.com",
    databaseURL: "https://e-commerce-3ee1f.firebaseio.com",
    projectId: "e-commerce-3ee1f",
    storageBucket: "e-commerce-3ee1f.appspot.com",
    messagingSenderId: "313250107871",
    appId: "1:313250107871:web:d7ba51f71a691f2e8b746a",
    measurementId: "G-L4S68ELJGT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const fs = require('fs'); 
fs.readFile('./crawling/data.json', 'utf-8', (err, res) => {
    dataList = JSON.parse(res);
    insertDataToFirebase(dataList);
})

function insertDataToFirebase(dataList) {
    dataList.forEach(data => {
        db.collection('products').add({
            name: data.name,
            price: data.price,
            category: data.category,
            description: data.description,
            imgUrl: data.imgUrl
        })
        .then(res => {
            console.log(`INSERT ${data.name}`);
        })
        .catch(err => {
            console.log(`err is occuered when creating ${data.name}`);
        })
    })
}