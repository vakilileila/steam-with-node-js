var Hero = require('../models/hero');
var HeroCategory = require('../models/heroCategory');
var Enumerable = require('linq');
var paginate = require('express-paginate');


module.exports = function (app, express) {
    var apiRouter = express.Router();


    /*--------- select category page   -------*/
    apiRouter.route('/category')

        .get(function (req, res) {
            HeroCategory.find().exec(function (err, categoreis) {
                if (err) {
                    console.log(err);
                    res.end('Fetching data failed...');
                    return;
                }
                var categoriesView = Enumerable.from(categoreis)
                    .select(function (category) {
                        category.imageUrl = "/uploads/" + category.imageUrl;
                        return category;
                    });
                if (!HeroCategory.paginate)
                    consoleSchema.log('Mongose Plugin is Exits ...');

                HeroCategory.paginate({}, {page: req.query.page, limit: req.query.limit}
                    ,
                    function (err, categoreis, pageCount, itemCount) {
                        res.render('./category.ejs', {
                            categoreis: categoriesView,
                            pageCount: pageCount,
                            itemCount: itemCount,
                            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
                            paginate:paginate

                        });
                    });
            });
           /*HeroCategory.find().exec(function (err, categoreis) {
                if (err) {
                    console.log(err);
                    res.end('Fetching data failed...');
                    return;
                }
                var categoriesView = Enumerable.from(categoreis)
                    .select(function (category) {
                        category.imageUrl = "/uploads/" + category.imageUrl;
                        return category;
                    });


                categoreis.paginate({}, {
                    page: req.query.page,
                    limit: req.query.limit
                }, function (err, categoreis, pageCount, itemCount) {

                    if (err) return next(err);

                    res.render('./category.ejs', {
                        categoreis: categoriesView,
                        categoreis: categoreis,
                        pageCount: pageCount,
                        itemCount: itemCount,
                        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
                    });

                });

                res.render('./category.ejs', {categoreis: categoriesView});
            });*/
        });

    /*--------select page categoryList --------  */
    apiRouter.route('/admin/heroCategories')
        .get(function (req, res) {
            HeroCategory.find().sort('name').exec(function (err, cats) {


                res.render('./categoryList.ejs', {categories: cats, layout: 'layoutAdmin'});
            });
        });


    /*-------- create category (nameCategory-image)  --------*/
    apiRouter.route('/admin/heroCategories/create')
        .get(function (req, res) {
            res.render('./categoryCreate.ejs', {layout: 'layoutAdmin',
            notify:[
                    {message : ""},
                    {type : ""}
                ]
            });
        })
        .post(function (req, res) {
            var dto = req.body;
            dto.imageUrl = dto.image;
            var newHero = new HeroCategory(dto);

            newHero.save(function (err) {

                if (err) {
                    res.end('error');
                    return;
                }

                res.redirect('/admin/heroCategories');
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

                    var herosView = Enumerable.from(heros)
                        .select(function (hero) {
                            hero.imageUrl = "/uploads/" + hero.imageUrl;
                            return hero;
                        });

                    res.render('./heros.ejs', {heros: herosView});
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
                    res.render('categoryUpdate.ejs', {category: category, layout: 'layoutAdmin',  notify:[
                        {message : ""},
                        {type : ""}
                    ]})
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
                    category.imageUrl = editedCategory.image;
                    category.name = editedCategory.name;


                    category.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.end('Error in ');
                        }
                        res.redirect('/admin/heroCategories');
                    });

                });
        });


    /*--------  admin delete hero    --------*/
    apiRouter.route('/admin/category/delete/:id')
        .get(function (req, res) {
            Hero.findOne({'category._id':req.params.id})
             .exec(function (err, hero) {
             if(err){
             console.log('not permit');
             }

             if(hero){
             res.end('hero used'
             )
             }
             else{
            HeroCategory.findById(req.params.id)
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
/*
             Hero.find({'category._id':req.params.id}).exec(function (err, heros) {
             if(heros.length> 0){
             //    errors ...
             }
             });*/

        });


    return apiRouter;
}
