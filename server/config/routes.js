var express = require('express');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });


    app.use('/api', require('../routes/userApi')(app, express));
    app.use('/', require('../routes/heroCtrl')(app, express));
    app.use('/', require('../routes/heroCategoryCtrl')(app, express));



    app.use('/api', require('../routes/uploadApi')(app, express));
}
