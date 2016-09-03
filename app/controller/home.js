/**
 * Created by mouxiao on 16/8/19.
 */

var  key = lib.setting.googleAuthKey;
var  Blog = require(MODELS + 'Blog.js');
var  Cover = require(MODELS + 'Cover.js');

var marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

exports.index = function(req, res) {
    return Cover.readTopAndCount(function(err, cover, count) {
        var hasCover, topBlog, total;
        total = 0;
        hasCover = false;
        topBlog = {};
        if (err) {
            cover = new Cover({
                contentBegin: '崇尚自由，追求简约',
                img: {
                    original: "/images/bg-new.jpg"
                }
            });
        } else {
            cover.content = marked(cover.content);
        }
        Blog.returnTopBlog(function(err, blogs) {
            if (err) {
                blogs = [];
            }
            return res.render('home/index', {
                title: lib.setting.titles.index,
                user: req.session.user,
                cover: cover,
                topblogs: blogs,
                hascover: hasCover,
                total: count,
                isLastPage: total === 1
            });
        });
    });
};

exports.about = function(req, res) {
    res.render('home/about', {
        title: lib.setting.titles.index,
        user: req.session.user
    });
};
exports.loginView = function(req, res){
    return res.render('home/login', {
        titlt: lib.setting.titles.login
    });
};

exports.login = function(req, res){
    console.log(req.body);
    console.log(req.body.email + ':' + req.body.password);
    if (req.body.email != lib.setting.loginUserName || req.body.password != lib.setting.loginPwd){
        res.redirect('/login')
    }else{
        req.session.login = "muxiao";
        res.redirect("/google-auth");
    }
}

exports.checkLogin = function(req, res, next){
    if (!req.session.login){
        res.redirect('/login');
    }
    return next();
}

exports.checkPwd = function(req, res, next){
    console.log('login ==' + req.session.login);
    if (!req.session.login) {
        res.redirect('/login');
    }
    return next();
}

exports.googleAuth = function(req, res) {
    console.log(req.body.code == key + 'key:' + key + 'code:' + req.body.code);
    if (req.body.code == key) {
        req.session.user = "Mu Xiao";
        return res.redirect('/manage');
    } else {
        return res.redirect('/google-auth');
    }
};

exports.googleAuthView = function(req, res) {
    console.log(req.session.user);
    return res.render('home/googleAuth', {
        title: lib.setting.titles.login,
        user: req.session.user
    });
};

exports.manage = function(req, res) {
    console.log('开始查询');
    return Blog.find({}).sort({
        date: -1
    }).exec(function(err, blogs) {
        console.log('查询博客');
        if (err) {
            blogs = [];
        }
        return Cover.find({}).sort({
            date: -1
        }).exec(function(err, covers) {
            console.log('查询主题');
            if (err) {
                covers = [];
            }
            return res.render('home/manage', {
                title: lib.setting.titles.manage,
                blogs: blogs,
                covers: covers,
                user: req.session.user
            });
        });
    });
};

exports.logout = function(req, res) {
    req.session.user = null;
    req.session.login = null;
    return res.redirect('/');
};