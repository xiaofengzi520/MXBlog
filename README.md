# MXBlog
============

>A simple blog built by node.js , express4 and mongodb. Live demo : [xiaoself.com](http://www.xiaoself.com)



## Getting Started

Before you start in MXBlog, you should install node.js and mongodb. 

After that you should pull the code to local. 

Do that : 

```
npm install
```
or

```
sudo npm install
```
And then, edit the settings.example.js to settings.js.

```
module.exports = {
cookieParser: '',
cookieSecret: '',
googleAuthKey: '', //When you login blog, there will have a googleAuth, this is the googleAuthKey.
loginPwd: '',     //Passwd to login.
QnClient: {      //Using qiuniu to store images.
accessKey: '',
secretKey: '',
bucket: '',
domain: ''
},
loginUserName: '',   //UserName to login.
db: '',             //mongodb db_name
host : '',
port : '',
perPageBlogSize : 10,  //In bloglist view, how many blogs can be shown.
titles : {
login: "login · XIAO BLOG · Innovative From The Core",
manage: "manage · XIAO BLOG · Innovative From The Core",
index : '潇 ·博客 简约,纯粹,个人博客',
blog_bloglist: "Blog · XIAO BLOG · Innovative From The Core",
blog_post: "POST · XIAO BLOG · Innovative From The Core",
blog_edit: 'EDIT · XIAO BLOG · Innovative From The Core',
blog_view: 'VIEW · XIAO BLOG · Innovative From The Core',
tags: "Tag · XIAO BLOG · Innovative From The Core",
eachTag: "XIAO BLOG · Innovative From The Core",
cover: "Cover · XIAO BLOG · Innovative From The Core",
eachCover: "XIAO BLOG · Innovative From The Core",
postCover: "Post Cover · XIAO BLOG · Innovative From The Core",
editCover: "Edit Cover · XIAO BLOG · Innovative From The Core",
blog_perBlog : "BLOG · XIAO BLOG · Innovative From The Core"
}


```

## Remark


MXBlog use qiniu to store images, so before you can use MXBlog you should register a account in [qiniu.com](http://qiniu.com). 

You also need edit the googleAuthKey, for example:

```
googleAuthKey: 'This_is_a_demoe_authkey'
```
After you start the MXBlog in `node app.js`,you will see things like that:

```
express-session deprecated undefined saveUninitialized option; provide saveUninitialized option config/express.js:67:13
Express server listening on port 3000
connected
```

## Watch out

OK, MXBlog just a demo, not a product, so, if you want to use it to build your own blog, you must be careful. 

It is built in express4, jade, mongoose, bootstrap. It may do some help for a node.js beginner.



About host, I use [DigitalOcean](https://www.digitalocean.com/?refcode=107abaf7339b), my blog [xiaoself.com](http://www.xiaoself.com) is hosted in [DigitalOcean](https://www.digitalocean.com/?refcode=107abaf7339b).



