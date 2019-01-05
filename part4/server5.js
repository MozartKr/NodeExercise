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

const session = {};

http.createServer((request, response) => {
    const cookies = parseCookies(request.headers.cookie);
    if (request.url.startsWith('/login')) {
        const { query } = url.parse(request.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        const randomInt = +new Date();
        session[randomInt] = {
            name,
            expires,
        };
        response.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        response.end();
    } else if (cookies.session && session[cookies.session].expires > new Date()) {
        response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        response.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
        fs.readFile('./server4.html', (err, data) => {
            if (err) {
                throw err;
            }
            response.end(data);
        });
    }
}).listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!')
});
