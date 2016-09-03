/**
 * Created by mouxiao on 16/8/19.
 */

var  logger = require('morgan');
var compress = require('compression');
var  bodyParser = require('body-parser');
var serve_static = require('serve-static');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore = require('connect-mongo')(session);
var   methodOverride = require('method-override');
var expressValidator = require('express-validator');


module.exports = function(){
    app.set('port', process.env.PORT || 3001);
    app.set('showStackError', true);
    app.set('title', 'Xiao Blog');
    app.set('views', VIEW);
    app.set('view engine', 'jade');
    app.use(logger('env'));
    app.use(compress({
        filter: function(req, res){
            return /json|text|javascript|css|html/.test(res.getHeader('Content-Type'));
        },
        level:9
    }));
    app.use(bodyParser.urlencoded({
            extended: true
        }
    ));
    app.use(expressValidator({
        errorFormatter: function(param, msg, value) {
            var formParam, namespace, root;
            namespace = param.split('.');
            root = namespace.shift();
            formParam = root;
            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    }));
    app.use(cookieParser(lib.setting.cookieParser));
    app.use(methodOverride());
    app.use(session({
        secret: lib.setting.cookieSecret,
        cookie: {
            maxAge:365 * 24 * 60 * 60 * 1000
        },
        resave: false,
        store: new mongoStore({
            url: 'mongodb://' + lib.setting.host + ':' +lib.setting.port + '/' + lib.setting.db
        })
    }));
    app.use(serve_static(lib.path.join(BASE_DIR , "public")));
}