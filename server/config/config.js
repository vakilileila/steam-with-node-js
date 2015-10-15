var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/steamIran',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://dbUser:123456@ds051788.mongolab.com:51788/emarketdb',
        port: process.env.PORT || 80
    }
}