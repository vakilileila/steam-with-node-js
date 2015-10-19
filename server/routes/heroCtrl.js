var bodyParser = require('body-parser');
var Hero = require('../models/hero');
var HeroCategory = require('../models/heroCategory');
var HeroItem = require('../models/heroItem');

module.exports = function (app, express) {
    var apiRouter = express.Router();


    /*-------- select page heroList (info hero, update, delete, edit and put price) --------*/
    apiRouter.route('/admin/heros')
        .get(function (req, res) {
            Hero.find().exec(function (err, heros) {
                res.render('./heroList.ejs', {
                    heros: heros
                });
            });
        });

    /*--------  admin create hero (nameHero, upload image, select category, price)    --------*/
    apiRouter.route('/admin/hero/create')
        .get(function (req, res) {
            HeroCategory.find().exec(function (err, cats) {
                if (err) {
                    console.log(err);
                    res.end('error ');
                    return;
                }
                res.render('./heroCreate.ejs', {
                    categories: cats,
                    errors: []
                });
            });
        })
        .post(function (req, res) {
            res.render('./heroCreate.ejs', {
                errors: [
                    'name is required ...',
                    'You can not enter hero',
                    'You not allowed to create hero'
                ]
            });

            return;

            var dto = req.body;
            dto.imageUrl = dto.image;
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


    /*--------  update hero (nameHero, upload image, select category, price)   --------*/
    apiRouter.route('/admin/hero/edit/:id')
        .get(function (req, res) {
            Hero.findById(req.params.id)
                .exec(function (err, hero) {
                    if (err) {
                        console.log(err);
                        res.end('error in update hero');
                    }
                    HeroCategory.find().exec(function (err, cats) {
                        if (err) {
                            console.log(err);
                            res.end('error ');
                            return;
                        }
                        res.render('./heroUpdate.ejs', {hero: hero, categories: cats});
                    });
                });
        })
        .post(function (req, res) {
            var editedHero = req.body;

            Hero.findById(req.params.id)
                .exec(function (err, hero) {
                    if (err) {
                        console.log(err);
                        res.end('error in update hero');
                    }
                    HeroCategory.find().exec(function (err, cats) {
                        if (err) {
                            console.log(err);
                            res.end('error ');
                            return;
                        }
                        editedHero.category = JSON.parse(editedHero.category);
                        hero.category = editedHero.category;
                        hero.name = editedHero.name;
                        hero.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.end('Error in ');
                            }


                            res.end('hero updated successfully');
                        });
                    });
                });
        });

    /*--------  admin delete hero    --------*/
    apiRouter.route('/admin/hero/delete/:id')
        .get(function (req, res) {
            Hero.findById(req.params.id)
                .exec(function (err, hero) {
                    if (err) {
                        console.log(err);
                        res.end('error in delete hero');
                    }
                    else
                        hero.remove(function (err, hero) {
                            if (err) {
                                return console.error(err);
                            } else {
                                console.log('DELETE removing ID: ' + hero._id);


                                res.redirect("/admin/heros");

                            }
                        });

                });
        });


    return apiRouter;
};
