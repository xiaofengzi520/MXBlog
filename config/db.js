/**
 * Created by mouxiao on 16/8/19.
 */
 lib.mongoose.connect('mongodb://' + lib.setting.host + ':' +lib.setting.port + '/' + lib.setting.db, {
    server: {
        poolSize:3
    }
});
var db = lib.mongoose.connection;
db.on('connected', function() {
    return console.log("connected");
});
console.log('连接完成');
exports.disconnect = function() {
    return lib.mongoose.disconnect(function(err) {
        return console.log('all connections closed');
    });
};

