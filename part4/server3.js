const http = require('http');

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
    console.log(request.url, cookies);
    response.writeHead(200, {'Set-Cookie':'mycookie=test'});
    response.end('Hello Cookie');
}).listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다!')
});