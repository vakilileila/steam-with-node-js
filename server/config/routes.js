var express = require('express');
var passport = require('passport');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.ejs', {
            user: req.isAuthenticated() ? req.user : null
        });
    });

    app.use('/api', require('../routes/adApi')(app, express));
    app.use('/', require('../routes/adCtrl')(app, express));
    app.use('/', require('../routes/authCtrl')(app, express));
    app.use('/api', require('../routes/categoryApi')(app, express));
    app.use('/api', require('../routes/uploadApi')(app, express));
}
