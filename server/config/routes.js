var express = require('express');
var passport = require('passport');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.ejs', {
            user: req.isAuthenticated() ? req.user : null
        });
    });
    
    app.use('/', require('../routes/heroCtrl')(app, express));
<<<<<<< HEAD

    app.use('/', require('../routes/heroCategoryCtrl')(app, express));
    app.use('/api',require('../routes/heroCategoryApi')(app, express));

=======
    app.use('/', require('../routes/heroCategoryCtrl')(app, express));
    app.use('/', require('../routes/authCtrl')(app, express));
>>>>>>> 428208effdeefa40dc2768e759e118365f37bc12
    app.use('/api', require('../routes/uploadApi')(app, express));
}
