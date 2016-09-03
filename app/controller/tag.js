/**
 * Created by mouxiao on 16/8/21.
 */
var ArticleSub, Blog, async, mongoose, settings;

async = require('async');

Blog = require(MODELS + 'Blog.js');

mongoose = lib.mongoose;

ArticleSub = require(HELP + 'ArticleSub.js');

settings = lib.setting;

exports.getAllTags = function(req, res) {
    var getTagInfo, tagsInfo;
    tagsInfo = [];
    async.waterfall([
        function(cb) {
            return Blog.distinct('tags.tag', function(err, tags) {
                return cb(err, tags);
            });
        }, function(tags, cb) {
            return async.forEachLimit(tags, 1, getTagInfo, function(err) {
                return cb(err, tagsInfo);
            });
        }
    ], function(err, tagsInfo) {
        if (err) {
            tagsInfo = [];
        }
        return res.render('tags/index', {
            title: settings.titles.tags,
            tags: tagsInfo,
            user: req.session.user
        });
    });
    return getTagInfo = function(tag, cb) {
        return Blog.count({
            "tags.tag": tag
        }, null).exec(function(err, count) {
            if (err && count === 0) {
                count = "failed！";
            }
            if (tag === '') {
                return cb();
            } else {
                tagsInfo.push({
                    tag: tag,
                    count: count
                });
                return cb();
            }
        });
    };
};

exports.eachTag = function(req, res) {
    var tag;
    tag = req.params.tag;
    return Blog.find({
        "tags.tag": tag
    }, null).sort({
        date: -1
    }).exec(function(err, blogs) {
        if (err) {
            blogs = [];
        }
        return res.render('tags/eachtag', {
            title: tag + " · " + settings.titles.eachTag,
            blogs: blogs,
            tag: tag,
            count: blogs.length,
            user: req.session.user
        });
    });
};
