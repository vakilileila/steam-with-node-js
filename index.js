var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var Slide = require('./server/models/slideshow');
var ejs = require('ejs');

var env = process.env.NODE_ENV || 'development';

app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);
require('./server/config/auth').configure();
require('./server/config/ejs');



app.post('/upload', function (req, res) {
    if (req.files) {
        console.log('file is ...');
        console.log(req.files);
        res.send('file is ...');
    }
    else {
        console.log('file is not ...');
        res.send('file is not ...');
    }
});






app.listen(config.port);

console.log('Port ' + config.port + ' is listening ...');

console.log('http://localhost:' + config.port + '/');




