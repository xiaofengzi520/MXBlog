// 预编译前端模板函数, 如果修改了HTML模板, 需要重新编译
var hogan = require('hogan'),
    path = require('path'),
    fs = require('fs');

// unitDir  : 模板组件目录
// pathname : 前端模板js文件路径 
function compile(unitDir, pathname, head, item, foot) {
    var body = '';
    try {
        fs.readdirSync(unitDir).forEach(function (file) {
            body += item.replace('{{name}}', path.basename(file, path.extname(file)))
                         .replace('{{renderfn}}', hogan.compile(fs.readFileSync(path.join(unitDir, file), 'utf-8'), { asString: true }));
        });
        fs.writeFileSync(pathname, head + body + foot, 'utf-8');
    } catch (err) {
        throw err;
    }
}

module.exports = compile;