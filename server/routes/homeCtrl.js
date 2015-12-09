var bodyParser = require('body-parser');
var Slide = require('../models/slideshow');
var Hero = require('../models/hero');
var HeroCategory = require('../models/heroCategory');
var Enumerable = require('linq');



module.exports = function (app, express) {
    var apiRouter = express.Router();


    /*--------- select index page   -------*/
    try {
        apiRouter.route('/')

        .get(function (req, res) {
             Slide.find().exec(function (err, slide) {
                 if (err) {
                     console.log(err);
                     res.end('Fetching data failed home...');
                     return;

                 }
                 var slideView = Enumerable.from(slide)
                     .select(function (slide) {
                         slide.imageUrl = "/uploads/" + slide.imageUrl;
                         return slide;
                     })
                 Hero.find({'discount.isOnDiscount': 'true'})
                     .exec(function (err, specialHero) {
                         if (err) {
                             console.log(err);
                             res.end('fetching specialHero failed');
                             return;
                         }


                         var specialHeroView = Enumerable.from(specialHero)
                             .select(function (specialHero) {
                                 specialHero.imageUrl = "/uploads/" + specialHero.imageUrl;
                                 return specialHero;
                             })
                         res.render('index.ejs', {slide: slideView, specialHero: specialHeroView });
                     })


             });
         });
     }
     catch ( err )
     {
         if(err)
       console.log('500')
     }
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

                res.redirect('/admin/slideshow/create');
            });
        });

    return apiRouter;
}