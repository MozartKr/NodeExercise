const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep);
console.log('path.delimiter:', path.delimiter);
console.log('----------------------------');
console.log('path.dirname():', path.dirname(string));
console.log('path.extname():', path.extname(string));
console.log('path.basename():',
    path.basename(string));
console.log('path.basename():',
    path.basename(string, path.extname(string)));
console.log('----------------------------');
console.log('path.parse():', path.parse(string));
console.log('path.format():', path.format({
    dir:'E:\\Project',
    name : 'path',
    ext:'.js',
}));
// console.log('path.format():',  path.format(path.parse(string)));
console.log('path.normalize():', path.normalize('E://Project\\\path.js'));
console.log('----------------------------');
console.log('path.isAbsolute():', path.isAbsolute('E:\\'));
console.log('path.isAbsolute():', path.isAbsolute('./home'));
console.log('----------------------------');
console.log('path.relative():', path.relative('E:\\Project\\path.js', 'E:\\'));
console.log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/hc0517z'));
console.log('path.resolve():', path.resolve(__dirname, '..', '..', '/users', '.', '/hc0517z'));