var Hero = require('../models/hero');
var HeroCategory = require('../models/heroCategory');

module.exports = function (app, express) {
    var apiRouter = express.Router();

    /*--------- select category page   -------*/
    apiRouter.route('/category')

        .get(function (req, res) {
            HeroCategory.find().exec(function (err, category) {
                if (err) {
                    console.log(err);
                    res.end('Fetching data failed...');
                    return;
                }

                res.render('./category.ejs', {category: category});
            });
        });

    /*--------select page categoryList --------  */
    apiRouter.route('/admin/heroCategories')
        .get(function (req, res) {
            req.body
            HeroCategory.find().exec(function (err, cats) {
                res.render('./categoryList.ejs', {categories: cats});
            });
        });


    /*-------- create category (nameCategory-image)  --------*/
    apiRouter.route('/admin/heroCategories/create')
        .get(function (req, res) {
            res.render('./categoryCreate.ejs');
        })
        .post(function (req, res) {
            var newHero = new HeroCategory(req.body);

            newHero.save(function (err) {
                if (err) {
                    res.end('error');
                    return;
                }

                res.end('Succes');
            });
        });



    /*-------- click on category, select hero page   --------*/
    apiRouter.route('/heros/:id')
        .get(function (req, res) {
            Hero.find({'category._id': req.params.id})
                .exec(function (err, heros) {
                    if (err) {
                        console.log(err);
                        res.end('Fetching data failed...');
                    }
                    res.render('./heros.ejs', {heros: heros});
                })
        });


    /*--------   admin update category  (name, image)  --------*/
    apiRouter.route('/admin/category/edit/:id')
        .get(function (reg, res) {
            HeroCategory.findById(reg.params.id)
                .exec(function (err, category) {
                    if (err) {
                        console.log(err);
                        res.end('error in update hero');
                    }
                    res.render('categoryUpdate.ejs', {category: category})
                })
        })
        .post(function (reg, res) {
            var editedCategory = reg.body;
            HeroCategory.findById(reg.params.id)
                .exec(function (err, category) {
                    if (err) {
                        console.log(err);
                        res.end('error in update hero');
                    }

                    category.name=editedCategory.name;


                    category.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.end('Error in ');
                        }
                        res.end('category updated successfully');
                    });

                });
        });


    /*--------  admin delete hero    --------*/
    apiRouter.route('/admin/category/delete/:id')
        .get(function (reg, res) {
            Hero.findOne({'category._id':req.params.id})
                .exec(function (err, hero) {
                    if(erro){

                    }

                    if(hero){
                        res.render('', {
                            errors:[
                                'The current Categroy is used in hero ' + hero._id
                            ]
                        })
                    }
                    else{
                        HeroCategory.findById(reg.params.id)
                            .exec(function (err, category) {
                                if (err) {
                                    console.log(err);
                                    res.end('error in delete category');
                                }
                                else
                                    category.remove(function (err, category) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            console.log('DELETE removing ID: ' + category._id);
                                            res.redirect('/admin/heroCategories');
                                        }
                                    });

                            });
                    }
                });

            Hero.find({'category._id':req.params.id}).exec(function (err, heros) {
                if(heros.length> 0){
                //    errors ...
                }
            });

        });

    return apiRouter;
}
