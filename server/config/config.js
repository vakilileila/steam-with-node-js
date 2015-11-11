var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');


module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://dbadmin:123456@ds053764.mongolab.com:53764/dbiransteam'

    },
    production: {
        db: 'mongodb://dbadmin:123456@ds053764.mongolab.com:53764/dbiransteam',
        root: rootPath,
        app: {
            name: 'MEAN - A Modern Stack - Production'
        },
        port: process.env.PORT || 80
    }


}