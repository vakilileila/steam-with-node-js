
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');


module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://admin:admin@ds053784.mongolab.com:53784/dbiransteam',
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://admin:admin@ds053784.mongolab.com:53784/dbiransteam',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}
