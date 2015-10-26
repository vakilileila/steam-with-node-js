var bodyParser = require('body-parser');
var Slide = require('../models/slideshow');



module.exports = function (app, express) {
    var apiRouter = express.Router();


   /!*--------- select index page   -------*!/
    apiRouter.route('/')
    .get( function (req, res) {
        Slide.find().exec(function (err, slide) {
            if (err) {
                console.log(err);
                res.end('Fetching data failed...');
                return;

            }

                res.render('index.ejs', {slide: slide});

        });
    });

    /*--------  admin create slideshow (nameSlide, upload image, description, price)    --------*/
    apiRouter.route('/admin/slideshow/create')
        .get(function (reg, res) {
        Slide.find().exec(function (err, slide) {
            if (err) {
                console.log(err);
                res.end('error');
                return;
            }
            res.render('slideshowCreate.ejs', {slide: slide});

        });

    })

apiRouter.route('/admin/slideshow/create')
    .post(function (req, res) {
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
    return apiRouter;
}