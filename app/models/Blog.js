    var Blog, Schema, blogSchema;

    mongoose = lib.mongoose;

    Schema = mongoose.Schema;

    blogSchema = new Schema({
        content: String,
        markdownText: String,
        contentBegin: String,
        tags: [
            {
                tag: String,
                id: Number
            }
        ],
        title: String,
        user: String,
        date: Date,
        time: {
            year: String,
            month: String,
            day: String,
            minute: String
        },
        imgs: [String],
        img: {
            original: String,
            px200: String,
            px600: String,
            px1366: String
        },
        isTop: {
            type: Boolean,
            "default": false
        },
        pv: {
            type: Number,
            "default": 0
        },
        editDate: [
            {
                date: Date,
                ip: String
            }
        ]
    });

    blogSchema.statics = {
        returnTopBlog: function(cb) {
            return this.find({
                isTop: true
            }).sort({
                isTop: -1,
                date: -1
            }).limit(5).exec(function(err, blogs) {
                if (err) {
                    return cb(err, null);
                } else {
                    return cb(null, blogs);
                }
            });
        },
        returnPerpageBlogIndex: function(perpage, cb) {
            var blogThis;
            blogThis = this;
            return this.count().exec(function(err, count) {
                if (err) {
                    return cb(err, null, 0);
                } else {
                    return blogThis.find({}).sort({
                        date: -1
                    }).limit(perpage).exec(function(err, blogs) {
                        if (err) {
                            return cb(err, null, 0);
                        } else {
                            return cb(null, blogs, count);
                        }
                    });
                }
            });
        },
        returnPerpageBlog: function(perpage, page, cb) {
            var blogThis;
            blogThis = this;
            return this.count().exec(function(err, count) {
                if (err) {
                    return cb(err, null, 0);
                } else {
                    return blogThis.find({}, null, {
                        skip: (page - 1) * perpage,
                        limit: perpage
                    }).sort({
                        date: -1
                    }).select('title contentBegin time').exec(function(err, blogs) {
                        if (err) {
                            return cb(err, null, 0);
                        } else {
                            return cb(null, blogs, count);
                        }
                    });
                }
            });
        },
        returnBlogById: function(id, cb) {
            return this.findById(id).exec(function(err, blog) {
                if (err) {
                    return cb(err, null);
                } else {
                    return cb(null, blog);
                }
            });
        },
        updateBlogPv: function(id) {
            return this.update({
                _id: id
            }, {
                $inc: {
                    "pv": 1
                }
            }).exec();
        },
        returnView: function(year, month, cb) {
              var condition, initial, keys, reduce;
             keys = {
             'time.month': true
             };
             condition = null;
             initial = {
             count: 0,
             blogs: []
             };
             reduce = function(doc, aggregator) {
             aggregator.count += 1;
             return aggregator.blogs.push(doc);
             };
             return this.collection.group(keys, condition, initial, reduce, null, null, null, function(err, results) {
             console.log(err);
             if (!err){
             console.log('result:' + results);
             var compare, compare2;
             compare = function(value1, value2) {
             return new Date(value2['time.month']) - new Date(value1['time.month']);
             };
             compare2 = function(value1, value2) {
             return value1.date - value2.date;
             };
             results.sort(compare).forEach(function(item, index, arr) {
             return item.blogs.sort(compare2);
             });
             }
             return cb(err, results);
             });
             }
            //this.aggregate({
            //        $group: {
            //            _id : "$time.month",
            //            count : {$sum:1},
            //        }
            //    })
            //    .exec(function (err, data) {
            //        if (err){
            //            return cb(err, data);
            //        }else {
            //            var compare;
            //            compare = function(value1, value2) {
            //                return new Date(value2['_id']) - new Date(value1['_id']);
            //            };
            //           data.sort(compare).forEach(function(item, index, arr){
            //               Blog.find({
            //                   'time.month' : item["_id"]
            //               }).sort({
            //                   date: -1
            //               }).exec(function(err, blogs) {
            //                   if (err){
            //                       return cb(err, null);
            //                   }
            //                   item["blogs"] = blogs;
            //                   item["time.month"] = item["_id"];
            //                   if (index == arr.length - 1){
            //                       return cb(err, data);
            //                   }
            //               });
            //           });
            //        }
            //    });


    };

    Blog = mongoose.model('Blog', blogSchema);

    module.exports = Blog;


//# sourceMappingURL=Blog.js.map
