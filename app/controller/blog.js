/**
 * Created by mouxiao on 16/8/19.
 */



var Perpage = lib.setting.perPageBlogSize;
var Blog = require(MODELS + 'Blog.js');
var   formidable = require('formidable');
var   qn = require('qn');
var   client = qn.create(lib.setting.QnClient);
var fs = require('fs');
var marked = require('marked');
var env = require('jsdom').env;
var   html = "<html><body></body></html>";
var path = lib.path;
var ArticleSub = require(HELP + 'ArticleSub.js');

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
var sanitizeHtml = require('sanitize-html');


var  postPre = function(req, res, cb) {
    console.log('表单:' + req.body);
    var blogHtml, content, contentBegin, date, errows, i, img, imgs, ip, tags, text, title, _i;
    req.assert('text', 'Content should not be empty！').notEmpty();
    req.assert('title', 'Title should not be empty！').notEmpty();
    errows = req.validationErrors();
    if (errows) {
        res.json({
            err: errows,
            success: false
        });
    } else {
        content = req.body.text;
        title = req.body.title;
        tags = [];
        for (i = _i = 1; _i <= 3; i = ++_i) {
            tags.push({
                tag: req.body['tag' + i.toString()],
                id: i
            });
        }
        console.log(tags);
        imgs = [];
        blogHtml = marked(content);
        img = '';
        text = sanitizeHtml(blogHtml, {
            allowedTags: ['a', 'p', 'pre', 'ul', 'li', 'em', 'b', 'i'],
            allowedAttributes: {
                'a': ['href']
            }
        });
        text = ArticleSub.subArtc(text, 200).toString() + '';
        contentBegin = text.replace(/<img.*?>/ig, "");
        date = new Date();
        ip = req.ip;
        env(html, function(err, window) {
            var $;
            console.log(err);
            $ = require('jquery')(window);
            $('body').append(blogHtml);
            $('img').each(function(index) {
                imgs.push($(this).attr("src"));
                console.log(imgs);
                if (index === 0) {
                    img = $(this).attr("src");
                    return cb(content, title, tags, imgs, contentBegin, img, date, ip);
                }
            });
            if ($('img').length === 0) {
                return cb(content, title, tags, imgs, contentBegin, img, date, ip);
            }
        });
    }
};


exports.blogPerpage = function (req, res){
    return Blog.returnPerpageBlogIndex(Perpage, function(err, blogs, count){
        if (err){
            blogs = [];
        }
        console.log('当前:' + blogs.length + ':' + count);
        var  onlyOnePage = blogs.length < Perpage;
        onlyOnePage = !onlyOnePage;
        console.log('是否最后一页:' + onlyOnePage);
        return res.render('blog/bloglist',{
            title : lib.setting.titles.blog_bloglist,
            posts: blogs,
            onlyOnePage: onlyOnePage,
            user: req.session.user
        });
    });
};

exports.getBlogPerpage = function(req, res) {
    var page;
    page = parseInt(req.query.page);
    return Blog.returnPerpageBlog(Perpage, page, function(err, blogs, count) {
        var isLastPage;
        if (err) {
            return res.json({
                success: false,
                info: 'fail to get！'
            });
        } else {
            isLastPage = ((page - 1) * Perpage + blogs.length) === count;
            console.log("当前页:" + page +'lenth:' + blogs.length + 'total:' + count);
            return res.json({
                total: count,
                success: true,
                blogs: blogs,
                isLastPage: isLastPage
            });
        }
    });
};

exports.perBlog = function(req, res) {
    var id;
    id = req.params.id;
    Blog.updateBlogPv(id);
    return Blog.returnBlogById(id, function(err, blog) {
        if (err) {
            blog = {};
        }
        blog.content = marked(blog.content);
        return res.render('blog/perBlog', {
            title: blog.title + " · " + lib.setting.titles.blog_perBlog,
            blog: blog,
            blogid: req.params.id,
            user: req.session.user
        });
    });
};

exports.postView = function(req, res) {
    var count, tags;
    count = 1;
    tags = [];
    while (count < 4) {
        tags.push({
            tag: '',
            id: count
        });
        count++;
    }
    return res.render('blog/post', {
        title: lib.setting.titles.blog_post,
        user: req.session.user,
        blog: new Blog({
            tags: tags,
            content: ''
        }),
        action: "post"
    });
};

exports.post = function(req, res) {
    return postPre(req, res, function(content, title, tags, imgs, contentBegin, img, date, ip) {
        var blog;
        blog = new Blog({
            content: content,
            title: title,
            contentBegin: contentBegin,
            tags: tags,
            img: {
                px600: img,
                px200: img,
                original: img,
                px1366: img
            },
            imgs: imgs,
            user: req.session.user,
            date: date,
            time: {
                year: date.getFullYear(),
                month: date.getFullYear() + "-" + (date.getMonth() + 1),
                day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
                minute: date.getHours() + ':' + date.getMinutes()
            },
            ip: ip
        });
        return blog.save(function(err) {
            if (err != null) {
                return res.json({
                    success: false,
                    err: err
                });
            } else {
                return res.redirect('blog');
            }
        });
    });
};
exports.postImg = function(req, res) {
    console.log('上传图片');
    var form, postFrom;
    form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(BASE_DIR, 'upload_tmp');
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.keepAlive = true;
    postFrom = "";
    if (req.path === '/post') {
        postFrom = 'blog';
    } else {
        postFrom = 'cover';
    }
    return form.parse(req, function(err, fields, files) {
        var date, extName, img, name;
        if (err) {
            res.json({
                success: false
            });
            return;
        }
        extName = '';
        switch (files.upload.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
        }
        console.log(extName);
        if (extName.length === 0) {
            res.json({
                success: false
            });
            return;
        }
        date = new Date();
        img = files.upload;
        var imageNameArr = img.name.split('.');
        name = imageNameArr.shift() + " " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + '.jpg';
        return client.uploadFile(files.upload.path, {
            key: name
        }, function(err, result) {
            if (err) {
                console.log(err);
                res.json({
                    success: false
                });
                return;
            }
            fs.unlink(files.upload.path);
            console.log('回传地址:' + result.url);
            return res.json({
                success: true,
                form: postFrom,
                path: {
                    original: 'http://' + result.url,
                    px200: 'http://' +result.url,
                    px600:'http://' + result.url,
                    px1366: 'http://' +result.url
                }
            });
        });
    });
};

exports.editBlogView = function(req, res) {
    var id;
    id = lib.mongoose.Types.ObjectId(req.params.id);
    return Blog.findById(id, null, function(err, doc) {
        var count, len;
        count = 1;
        len = doc.tags.length;
        while (count < 4 - len) {
            doc.tags.push({
                tag: ''
            });
            count++;
        }
        return res.render('blog/post', {
            title: lib.setting.titles.blog_edit,
            blog: doc,
            user: req.session.user,
            action: "editblog"
        });
    });
};

exports.editBlog = function(req, res) {
    var id;
    id = req.params.id;
    return postPre(req, res, function(content, title, tags, imgs, contentBegin, img, date, ip) {
        var blog;
        blog = {
            content: content,
            title: title,
            contentBegin: contentBegin,
            tags: tags,
            img: {
                px600: img,
                px200: img,
                original: img,
                px1366: img
            },
            imgs: imgs
        };
        return Blog.update({
            _id: id
        }, {
            $set: blog,
            $push: {
                "editDate": {
                    date: date,
                    ip: ip
                }
            }
        }, function(err, num, row) {
            if (err && num === 0) {
                return res.json({
                    success: false
                });
            } else {
                return res.redirect('/blog');
            }
        });
    });
};

exports.viewIndex = function(req, res) {
    return Blog.returnView(null, null, function(err, monthBlogs) {
        if (err) {
            monthBlogs = [];
        }
        return res.render("blog/view", {
            title: lib.setting.titles.blog_view,
            MonthBlogs: monthBlogs,
            user: req.session.user
        });
    });
};
exports.deleteBlog = function(req, res) {
    var id;
    id = req.query.id;
    console.log(id);
    return Blog.remove({
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
    return Blog.update({
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