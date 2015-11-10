var bodyParser = require('body-parser');
var Slide = require('../models/slideshow');
var Hero = require('../models/hero');
var HeroCategory = require('../models/heroCategory');
var Enumerable = require('linq');



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
    apiRouter.route('/admin')

        .get(function (req, res) {
            HeroCategory.find().exec(function (err, cats) {
                res.render('./categoryList.ejs', {categories: cats, layout: 'layoutAdmin'});
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
                res.render('slideshowCreate.ejs', {slide: slide,  layout: 'layoutAdmin'});

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