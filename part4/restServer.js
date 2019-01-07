const http = require('http');
const fs = require('fs');

const users = {};

http.createServer((request, response) =>  {
   if (request.method === 'GET') {
       if (request.url === '/') {
           return fs.readFile('./restFront.html', (err, data) => {
               if (err) {
                   throw err;
               }
               response.end(data);
           });
       } else if (request.url === '/about') {
           return fs.readFile('./about.html', (err, data) => {
               if (err) {
                   throw err;
               }
               response.end(data);
           });
       } else if (request.url === '/users') {
           return response.end(JSON.stringify(users));
       }

       return fs.readFile(`.${request.url}`, (err, data) => {
          if (err) {
              response.writeHead(404, 'NOT FOUND');
              return response.end('NOT FOUND');
          }
          return response.end(data);
       });
   } else if (request.method === 'POST') {
       if (request.url === '/users') {
           let body = '';
           request.on('data', data => {
              body += data;
           });
           return request.on('end', () => {
             console.log('POST 본문(Body):', body);
             const { name } = JSON.parse(body);
             const id = +new Date();
             users[id] = name;
             response.writeHead(201);
             response.end('등록 성공');
           });
       }
   } else if (request.method === 'PUT') {
       if (request.url.startsWith('/users')) {
           const key = request.url.split('/')[2];
           let body = '';
           request.on('data', data => {
               body += data;
           });
           return request.on('end', () => {
               console.log('PUT 본문(Body):', body);
               users[key] = JSON.parse(body).name;
               return response.end(JSON.stringify(users));
           });
       }
   } else if (request.method === 'DELETE') {
       if (request.url.startsWith('/users')) {
           const key = request.url.split('/')[2];
           delete users[key];
           return response.end(JSON.stringify(users));
       }
   }

    response.writeHead(404, 'NOT FOUND');
    return response.end('NOT FOUND');
}).listen(8085, () => {
    console.log('8085번 포트에서 서버 대기 중입니다.');
});