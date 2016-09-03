/**
 * Created by mouxiao on 16/8/21.
 */
(function() {
    var ArticleSub, Cover, marked, mongoose, settings;

    Cover = require(MODELS + 'Cover.js');

    mongoose = lib.mongoose;

    ArticleSub = require(HELP + 'ArticleSub.js');

    settings = lib.setting;

    marked = require('marked');

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
        return Cover.find({}).sort({
            date: -1
        }).exec(function(err, covers) {
            if (err) {
                return covers = [];
            } else {
                return res.render('cover/cover', {
                    title: settings.titles.cover,
                    covers: covers,
                    user: req.session.user
                });
            }
        });
    };

    exports.eachCover = function(req, res) {
        var id;
        id = req.params.id;
        Cover.update({
            _id: id
        }, {
            $inc: {
                "pv": 1
            }
        }).exec();
        return Cover.findById(id).exec(function(err, cover) {
            if (err) {
                cover = {};
            }
            cover.content = marked(cover.content);
            return res.render('cover/eachcover', {
                title: cover.title + " · " + settings.titles.eachCover,
                cover: cover,
                user: req.session.user
            });
        });
    };

    exports.editCoverView = function(req, res) {
        var id;
        id = req.params.id;
        return Cover.findById(id).exec(function(err, cover) {
            return res.render('cover/postcover', {
                title: settings.titles.editCover,
                cover: cover,
                user: req.session.user
            });
        });
    };

    exports.editCover = function(req, res) {
        var contentBegin, cover, date, id, img, ip, quote;
        img = '';
        contentBegin = marked(req.body.quote);
        date = new Date();
        ip = req.ip;
        img = req.body.img;
        id = req.params.id;
        quote = req.body.quote;
        cover = {
            content: req.body.text,
            title: req.body.title,
            contentBegin: contentBegin,
            quote: quote,
            img: {
                px600: img ,
                px200: img ,
                original: img,
                px1366: img
            }
        };
        return Cover.update({
            _id: id
        }, {
            $set: cover,
            $push: {
                "editDate": {
                    date: date,
                    ip: ip
                }
            }
        }).exec(function(err, cover) {
            console.log(err + '更新失败');
            if (err) {
                return res.send('update failed！');
            } else {
                return res.redirect('/cover/' + id);
            }
        });
    };

    exports.postCoverView = function(req, res) {
        return res.render('cover/postcover', {
            title: settings.titles.postCover,
            action: 'post',
            user: req.session.user
        });
    };

    exports.postCover = function(req, res) {
        var contentBegin, cover, date, img, imgs, ip, quote;
        img = '';
        imgs = [];
        contentBegin = marked(req.body.quote);
        imgs.push(req.body.img);
        if (imgs && imgs.length > 0) {
            img = imgs[0];
        }
        date = new Date();
        ip = req.ip;
        quote = req.body.quote;
        cover = new Cover({
            quote: quote,
            content: req.body.text,
            title: req.body.title,
            contentBegin: contentBegin,
            imgs: imgs,
            img: {
                px600: img ,
                px200: img ,
                original: img,
                px1366: img
            },
            date: date,
            time: {
                year: date.getFullYear(),
                month: date.getFullYear() + "-" + (date.getMonth() + 1),
                day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
                minute: date.getHours() + ':' + date.getMinutes()
            },
            ip: ip
        });
        return cover.save(function(err) {
            if (err) {
                req.session.error = err;
                return res.send(' Post failed！');
            } else {
                return res.redirect('/cover/' + cover._id);
            }
        });
    };

    exports.deleteCover = function(req, res) {
        var id;
        id = req.query.id;
        return Cover.remove({
            _id: id
        }).exec(function(err) {
            if (err) {
                return res.json({
                    success: false
                });
            } else {
                return res.json({
                    success: true
                });
            }
        });
    };

    exports.setTop = function(req, res) {
        var id, istop;
        istop = false;
        id = req.query.id;
        if (req.query.istop === 'true') {
            istop = true;
        }
        return Cover.update({
            _id: id
        }, {
            $set: {
                isTop: istop
            }
        }).exec(function(err) {
            if (err) {
                return res.json({
                    success: false
                });
            } else {
                return res.json({
                    success: true
                });
            }
        });
    };

}).call(this);

//# sourceMappingURL=cover.js.map
