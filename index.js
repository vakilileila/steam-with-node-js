var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var Slide = require('./server/models/slideshow');
var Hero = require('./server/models/hero');
var HeroCategory = require('./server/models/heroCategory');
var Enumerable = require('linq');
var bodyParser = require('body-parser');

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





app.get('/', function (req, res) {
        Slide.find().exec(function (err, slide) {
            if (err) {
                console.log(err);
                res.end('Fetching data failed...');
                return;

            }
            Hero.find({'discount.isOnDiscount': 'true'})
                .exec(function(err, specialHero){
                    if(err){
                        console.log(err);
                        res.end('fetching specialHero failed');
                        return;
                    }
                    var specialHeroView = Enumerable.from(specialHero)
                        .select(function(special){
                            special.imageUrl = "/uploads/" + special.imageUrl;
                            return special;
                        })
                    res.render('index.ejs', {slide: slide , specialHero:specialHeroView});
                })



        });
    });


    app.get('/admin', function (req, res) {
        HeroCategory.find().exec(function (err, cats) {
            res.render('./categoryList.ejs', {categories: cats, layout: 'layoutAdmin'});
        });
    });
/*--------  admin create slideshow (nameSlide, upload image, description, price)    --------*/

    app.get('/admin/slideshow/create',function (reg, res) {
        Slide.find().exec(function (err, slide) {
            if (err) {
                console.log(err);
                res.end('error');
                return;
            }
            res.render('slideshowCreate.ejs', {slide: slide,  layout: 'layoutAdmin'});

        });

    })


    app.post('/admin/slideshow/create',function (req, res) {
        var createdSlide = req.body;

        createdSlide.imageUrl=createdSlide.image;
        var newslide = new Slide(createdSlide);
        newslide.save(function (err) {
            if (err) {
                res.end('error');
                return;
            }

            res.end('Succes');
        });
    });



app.listen(config.port);

console.log('Port ' + config.port + ' is listening ...');

console.log('http://localhost:' + config.port + '/');




