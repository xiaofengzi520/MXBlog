// 预编译前端模板函数, 如果修改了HTML模板, 需要重新编译
var compile = require('./compile/compile.js'),
    path = require('path');




compile(path.resolve('html/cover'),
        path.resolve('./unit-cover.js'),
        ';(function(mod) {\n' +
        'if (typeof exports === "object" && typeof module === "object") {\n' +
        'module.exports = mod(require("../hogan-3.0.1.min.js"), require("./pie.js"));\n' +
        '} else if (typeof define === "function" && define.amd) {\n' +
        'return define(["../hogan-3.0.1.min.js", "./pie.js"], mod);\n' +
        '} else {\n' +
        'mod(HOGAN, PIE);\n' +
        '}})(function(HOGAN, PIE) {\n' +
        'PIE.unit = {};\n',
        'PIE.unit["{{name}}"] = new HOGAN.Template({{renderfn}});\n',
        '});');
compile(path.resolve('html/blog'),
    path.resolve('./unit.js'),
        ';(function(mod) {\n' +
        'if (typeof exports === "object" && typeof module === "object") {\n' +
        'module.exports = mod(require("../hogan-3.0.1.min.js"), require("./pie.js"));\n' +
        '} else if (typeof define === "function" && define.amd) {\n' +
        'return define(["../hogan-3.0.1.min.js", "./pie.js"], mod);\n' +
        '} else {\n' +
        'mod(HOGAN, PIE);\n' +
        '}})(function(HOGAN, PIE) {\n' +
        'PIE.unit = {};\n',
    'PIE.unit["{{name}}"] = new HOGAN.Template({{renderfn}});\n',
    '});');

