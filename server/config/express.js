var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var multer = require('multer');
var favicon = require('serve-favicon');

module.exports = function (app, config) {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    //for ejs layout
    app.set("view engine", "ejs");
    app.set("views", "./views");

    app.set('views', config.rootPath + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.use('/client', express.static(config.rootPath + '/client'));
    app.use('/content', express.static(config.rootPath + '/client/content'));
    app.use('/uploads', express.static(config.rootPath + '/uploads'));

    app.use(multer({dest: './uploads/;'}));
}
