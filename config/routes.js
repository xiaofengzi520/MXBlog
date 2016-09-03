/**
 * Created by mouxiao on 16/8/19.
 */
module.exports = function(){
    var  home = require(CON + 'home.js');
    app.get('/', home.index);
    app.get('/login', home.loginView);
    app.post('/login', home.login);
    app.get('/google-auth', home.checkPwd, home.googleAuthView);
    app.post('/google-auth', home.checkPwd, home.googleAuth);
    app.get('/manage', home.checkLogin, home.manage);
    app.get('/about', home.about);
    app.get('/logout', home.checkLogin, home.logout);
    var  blog = require(CON + 'blog.js');
    app.get('/blog', blog.blogPerpage);
    app.get('/getBlogPerpage', blog.getBlogPerpage);
    app.get('/blog/:id', blog.perBlog);
    app.get('/post', home.checkLogin, blog.postView);
    app.post('/post', home.checkLogin, blog.post);
    app.post('/postimg', home.checkLogin, blog.postImg);
    app.get('/editblog/:id', home.checkLogin, blog.editBlogView);
    app.post('/editblog/:id', home.checkLogin, blog.editBlog);
    app.get('/view', blog.viewIndex);
    app.get('/deleteblog', home.checkLogin, blog.deleteBlog);
    app.get('/settopblog', home.checkLogin, blog.setTop);
    var tag = require(CON + 'tag.js');
    app.get('/tag', tag.getAllTags);
    app.get('/tag/:tag', tag.eachTag);
    var cover = require(CON + 'cover.js');
    app.get('/cover', cover.index);
    app.get('/cover/:id', cover.eachCover);
    app.get('/editcover/:id', home.checkLogin, cover.editCoverView);
    app.post('/editcover/:id', home.checkLogin, cover.editCover);
    app.get('/postcover', home.checkLogin, cover.postCoverView);
    app.post('/postcover', home.checkLogin, cover.postCover);
    app.get('/deletecover', home.checkLogin, cover.deleteCover);
    app.get('/settopcover', home.checkLogin, cover.setTop);
}