const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('dist/dist.html', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(data);
        }
    })
}).listen(8080);

console.log('Server running at http://localhost:8080');