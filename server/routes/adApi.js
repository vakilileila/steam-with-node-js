var bodyParser = require('body-parser');
var ad = require('../models/ad');


module.exports = function (app, express) {
    var apiRouter = express.Router();

    apiRouter.route('/ads')
        .get(function (req, res) {
            ad.find().exec(function (err, ads) {
                res.json(ads);
            });
        })
        .post(function (req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).send('Access Deny');
                return;
            }

            var cmd = req.body;

            var newAd = new ad({
                title: cmd.title,
                price: cmd.price,
                image: cmd.image,
                des: cmd.des,
                category: cmd.category,
                phone: cmd.phone,
                email: cmd.email,
                user: req.user
            });

            newAd.save(function (err) {
                if (err) console.error(err);
                res.json({success: true, ad: newAd});
            });
        });

    apiRouter.route('/ads/:id')
        .get(function (req, res) {
            ad.findById(req.params.id).exec(function (err, item) {
                res.json(item);
            });
        })
        .put(function (req, res) {
            var id = req.params.id;
            var cmd = req.body;

            ad.findById(req.params.id).exec(function (err, item) {
                item.title = cmd.title;
                item.price = cmd.price;
                item.image = cmd.image;
                item.des = cmd.des;
                item.phone = cmd.phone;
                item.email = cmd.email;
                item.category = cmd.category;

                item.save(function (err) {
                    if (err) {
                        console.error(err);
                        res.json({success: false});
                    }

                    res.json({success: true, ad: item});
                });
            });
        })

    apiRouter.route('/users/me/ads')
        .get(function (req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).send('Access Deny');
                return;
            }

            ad.find({'user._id': req.user._id.toString()}).exec(function (err, ads) {
                if (err)
                    res.send({err: err});

                console.log('ads: ');
                console.log(ads);

                res.json({Data: ads});
            });
        });

    apiRouter.route('/searchAds')
        .get(function (req, res) {
            console.log(req.query);
            var page = req.query.page;
            if (!page) page = 1;

            var searchData = {};

            if (req.query.categoryId)
                searchData['category._id'] = req.query.categoryId;

            ad.find(searchData)
                .limit(10)
                .skip((page - 1) * 10)
                .exec(function (err, ads) {
                    if (err) {
                        res.status(500).send('db retrieve error');
                        return;
                    }
                    res.json(ads);
                });
        });

    return apiRouter;
}

