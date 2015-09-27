var mongoose = require('mongoose');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on('error', function (error) {
        console.error('mongodb connection error')
        console.error(error.toString());
    });

    db.once('open', function callback() {
        console.log('mongodb open');
    });
};