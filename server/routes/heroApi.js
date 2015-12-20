var Hero = require('../models/hero');

module.exports = function (app, express) {
    var apiRouter = express.Router();

    /*--------- inclusive discount ------*/

    apiRouter.route('/admin/heros')
        .get(function (req, res) {

            Hero.find().exec(function (err, heros) {

               /* var heroView = Enumerable.from(heros)
                    .select(function (hero) {
                        hero.imageUrl = "/uploads/" + hero.imageUrl;
                        return hero;
                    });*/

                res.json({
                    data: heros,
                    total: 100
                });

                /*if (!Hero.paginate)
                    consoleSchema.log('Mongose Plugin is Exits ...');
                Hero.paginate({f}, {page: req.query.page, limit: req.query.pageSize}
                    ,
                    function (err, heros ,pageCount, itemCount) {
                        res.json({
                            data: heros,
                            total: itemCount
                        });
                    })*/


            });
        });


    apiRouter.route('/admin/specialItem/addDiscount/:id')

        .get(function (reg, res) {
            Hero.findById(reg.params.id)
                .exec(function (err, specilItem) {
                    if (err) {
                        console.log(err);
                        res.end('update discount error');
                        return;

                    }
                    res.json(specilItem);
                })
        })
        .post(function (req, res) {

            Hero.findById(req.params.id)
                .exec(function (err, specialItem) {

                    if (err) {
                        console.log(err);
                        res.end('error in update heroDiscount');
                    }
                    var discountInfo = req.body;
                    specialItem.discount.isOnDiscount = true;
                    specialItem.discount.priceDiscount = discountInfo.priceDiscount;
                    specialItem.discount.rate = discountInfo.rateDiscount;


                    specialItem.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.end('err');
                            return;
                        }
                        res.end("Success");
                    });
                });
        });

    /*----------- remove discount------------*/

    apiRouter.route('/admin/hero/undiscount/:id')
        .get(function (reg, res) {
            Hero.findById(reg.params.id)
                .exec(function (err, specialItem) {
                    if (err) {
                        console.log(err);
                        res.end('update discount error');
                        return;
                    }
                    res.json(specialItem);
                })
        })
        .post(function (req, res) {

            Hero.findById(req.params.id)
                .exec(function (err, specialItem) {

                    if (err) {
                        console.log(err);
                        res.end('error in update heroDiscount');
                    }
                    specialItem.discount.isOnDiscount = false;

                    specialItem.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.end('err');
                            return;
                        }
                        res.end("Success");
                    });
                });
        });

    apiRouter.route('/admin/hero/changePrice/:id')
        .get(function (reg, res) {
            Hero.findById(reg.params.id)
                .exec(function (err, changePrice) {
                    if (err) {
                        console.log(err);
                        res.end('error in update changePrice')
                    }
                    res.json(changePrice)
                    return;
                })
        })
        .post(function (reg, res) {
            Hero.findById(reg.params.id)
                .exec(function (err, changePrice) {
                    if (err) {
                        console.log(err);
                        res.end('error in update changePrice')

                    }
                    var priceInfo = reg.body;
                    changePrice.price = priceInfo.changePrice;

                    changePrice.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.end('error in save changePrice')
                            return;
                        }
                        res.end('success save changePrice')
                    })
                })

        });





    return apiRouter;
}