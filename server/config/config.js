var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');


module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/dbDota2',
        port: process.env.PORT || 3030
    },


    production: {
        db: ' mongodb://iransteamdb:l-8611268296@ds053164.mongolab.com:53164/iransteamdb',
        root: rootPath,
        app: {
            name: 'MEAN - A Modern Stack - Production'
        },
        port: process.env.PORT || 80
    }


}