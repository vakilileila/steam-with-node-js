var express = require('express');
var passport = require('passport');

module.exports = function (app) {
   /* app.get('/', function (req, res) {
        res.render('index.ejs', {
            user: req.isAuthenticated() ? req.user : null
        });
    });*/


    app.use('/', require('../routes/heroCtrl')(app, express));
    app.use('/', require('../routes/heroCategoryCtrl')(app, express));
    app.use('/api', require('../routes/heroCategoryApi')(app, express));
    app.use('/api', require('../routes/heroApi')(app, express));
    app.use('/', require('../routes/authCtrl')(app, express));


    app.use('/api', require('../routes/uploadApi')(app, express));
}
