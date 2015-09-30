var bodyParser = require('body-parser');
var Hero = require('../models/hero');
var HeroCategory = require('../models/heroCategory');
var HeroItem = require('../models/heroItem');

module.exports = function (app, express) {
    var apiRouter = express.Router();

    apiRouter.route('/admin/heros')
        .get(function (req, res) {
            Hero.find().exec(function (err, heros) {
                res.render('./heroList.ejs', {
                    heros: heros
                });
            });
        });

    apiRouter.route('/admin/hero/create')
        .get(function (req, res) {
            HeroCategory.find().exec(function (err, cats) {
                if (err) {
                    console.log(err);
                    res.end('error ');
                    return;
                }
                res.render('./heroCreate.ejs', {categories: cats});
            });
        })
        .post(function (req, res) {
            var dto = req.body;
            dto.category = JSON.parse(dto.category);

            var newHero = new Hero(dto);

            newHero.save(function (err) {
                if (err) {
                    console.log(err);
                    res.end('new hero failed ...');
                    return;
                }
                res.end('New Hero added successfully');
            });
        });

    apiRouter.route('/admin/hero/edit/:id')
        .get(function (req, res) {
            Hero.findById(req.params.id)
                .exec(function (err, hero) {
                    if (err) {
                        console.log(err);
                        res.end('error in update hero');
                    }
                    res.render('./heroUpdate', hero);
                })
        })
        .put(function (req, res) {
            var editedHero = req.body;

            Hero.findById(req.params.id)
                .exec(function (err, hero) {
                    if (err) {
                        console.log(err);
                        res.end('error in update hero');
                    }

                    hero.name = editedHero.name;
                    hero.category = editedHero.category;

                    hero.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.end('Error in ');
                        }

                        res.end('hero updated successfully');
                    });
                });
        });

    //apiRouter.route('/admin/hero/delete/:id')

    apiRouter.route('/admin/hero/items/update/:heroId')
        .get(function (req, res) {
            Hero.findById(req.body.heroId).exec(function (err, hero) {
                if (err) {
                    console.log(err);
                    res.end('Error ...');
                    return;
                }

                res.render('./heroItemUpdate', {hero: hero});
            })
        })
        .post(function (req, res) {
            Hero.findById(req.body.heroId).exec(function (err, hero) {
                if (err) {
                    console.log(err);
                    res.end('Error ...');
                    return;
                }

                hero.items = req.body.items;

                hero.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.end('Error...');
                        return
                    }

                    res.end('Success');
                })
            })
        })


    return apiRouter;
};

