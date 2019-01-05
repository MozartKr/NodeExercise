const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce( (acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {} );

http.createServer((request, response) => {
    const cookies = parseCookies(request.headers.cookie);
    if (request.url.startsWith('/login')) {
        const { query } = url.parse(request.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        response.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        response.end();
    } else if (cookies.name) {
        response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        response.end(`${cookies.name}님 안녕하세요`);
    } else {
        fs.readFile('./server4.html', (err, data) => {
            if (err) {
                throw err;
            }
            response.end(data);
        });
    }
}).listen(8083, () => {
   console.log('8083번 포트에서 서버 대기 중입니다!')
});
