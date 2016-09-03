/**
 * Created by mouxiao on 16/8/19.
 */
global.BASE_DIR = __dirname;
global.APP      = BASE_DIR + "/app/";
global.CON      = APP + "/controller/";
global.HELP     = APP + "/help/";
global.MODELS     = APP + "/models/"
global.LIB      = BASE_DIR + "/node_modules/";
global.CONF     = BASE_DIR + "/config/";
global.STATIC   = BASE_DIR + "/public/";
global.VIEW     = APP + "/views/";
global.lib = {
    http        : require('http'),
    express     : require('express'),
    path        : require('path'),
    setting     : require(CONF + 'setting.js'),
    mongoose    : require('mongoose')

};
global.app = lib.express();
require(CONF + 'express.js')();
require(CONF + 'routes.js')();
var db = require(CONF + 'db.js');
app.on('close', function(err){
    db.disconnect();
});
lib.http.createServer(app).listen(app.get('port'), function(){
   console.log('Express server listening on port ' + app.get('port'));
});



