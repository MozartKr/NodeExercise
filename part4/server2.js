const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
   fs.readFile('./server2.html', (err, data) => {
       if (err) {
           throw err;
       }
       response.end(data);
   });
}).listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중입니다!');
});

