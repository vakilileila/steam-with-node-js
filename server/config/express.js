var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var multer = require('multer');
var favicon = require('serve-favicon');
var ejsLayout = require("express-ejs-layouts")

module.exports = function (app, config) {
    app.use(favicon(config.rootPath + '/server/views/favicon.ico'));
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
    app.set("views", config.rootPath + '/server/views');
    app.use(ejsLayout);


    app.engine('html', require('ejs').renderFile);
    app.use('/public', express.static(config.rootPath + '/public'));
    app.use('/content', express.static(config.rootPath + '/client/content'));
    app.use('/uploads', express.static(config.rootPath + '/uploads'));

    app.use(multer({dest: './uploads/'}));

    // locals global
    app.use(function (req, res, next) {
        res.locals = {
            siteTitle: 'alaki',
            isAuthenticated: req.isAuthenticated(),
            user: req.isAuthenticated() ? req.user : null
        }
    });
}
