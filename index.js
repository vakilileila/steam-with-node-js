var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var Slide = require('./server/models/slideshow');
var SpecialItem = require('./server/models/specialItem');


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

/*--------- select index page   -------*/


/*app.get('/', function (req, res) {
    Slide.find().exec(function (err, slide) {
        if (err) {
            console.log(err);
            res.end('Fetching data failed...');
            return;

        }
        SpecialItem.find().exec(function (err, specialItem) {
            if (err) {
                console.log(err);
                res.end('Fetching data failed...');
                return;

            }
            res.render('index.ejs', {slide: slide, specialItem: specialItem});
        })
    });
});

/!*--------  admin create slideshow (nameSlide, upload image, description, price)    --------*!/

app.get('/admin/slideshow/create', function (reg, res) {
    Slide.find().exec(function (err, slide) {
        if (err) {
            console.log(err);
            res.end('error');
            return;
        }
        res.render('slideshowCreate.ejs', {slide: slide});

    });

})


app.post('/admin/slideshow/create', function (req, res) {
    var newslide = new Slide(req.body);

    newslide.save(function (err) {
        if (err) {
            res.end('error');
            return;
        }

        res.end('Succes');
    });
});

app.get('/admin/specialItem/create', function (reg, res) {
    SpecialItem.find().exec(function (err, specialItem) {
        if (err) {
            console.log(err);
            res._end('error create specialItem');
            return;
        }
        res.render('specialItemCreate.ejs', {specialItem: specialItem})
    });
});
app.post('/admin/specialItem/create', function (reg, res) {
    var createSpcial = reg.body;
    createSpcial.discount = {
        isOnDiscount: false
    };
    createSpcial.imageUrl = createSpcial.image;
    var newspecialItem = new SpecialItem(createSpcial);
    newspecialItem.save(function (err) {
        if (err) {
            res.end('error create specialitem');
            return;
        }
        res.end('succes create specialitem')
    });
});

app.post('/admin/specialItem/addDiscount/:itemId', function (req, res) {
    var discountInfo = req.body;
    SpecialItem.findById(req.params.itemId)
        .exec(function (err, specialItem) {
            if (err) {

            }
            specialItem.isOnDiscount = true;
            specialItem.discount.price = discountInfo.price;
            specialItem.discount.rate = discountInfo.rate;
            //specialItem.endTime = discountInfo.endTime;

            specialItem.save(function (err) {
                if (err) {
                }
                res.end("Success");
            });
        });
});

app.post('admin/specialItem/removeDiscount/:itemId', function () {
    SpecialItem.findById(req.params.itemId)
        .exec(function (err, specialItem) {
            if (err) {

            }
            specialItem.isOnDisCount = false;
            specialItem.discount.price = 0;
            specialItem.discount.rate = 0;
            //specialItem.endTime = discountInfo.endTime;

            specialItem.save(function (err) {
                if (err) {
                }
                res.end("Success");
            });
        });
})*/




app.listen(config.port);

console.log('Port ' + config.port + ' is listening ...');

console.log('http://localhost:' + config.port + '/');




