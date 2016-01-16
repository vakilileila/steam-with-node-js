var bodyParser = require('body-parser');
var User = require('../models/user');
var auth = require('../config/auth');
var Shop = require('../models/shoppingCart');
var Hero = require('../models/hero');
var User = require('../models/user');
var Enumerable = require('linq');

module.exports = function (app, express) {
    var apiRouter = express.Router();

    /*apiRouter.route('/users')
     .post(function (req, res) {
     var cmd = req.body;

     var newUser = new User({
     firstName: cmd.firstName,
     lastName: cmd.lastName,
     username: cmd.username,
     password: cmd.password
     });

     newUser.save(function (err, user) {
     if (err) {
     console.error(err);
     res.json({success: false});
     return;
     }

     res.json({success: true});

     });
     });

     //apiRouter.route('/users/login').post(auth.authenticate);

     apiRouter.route('/users/logout').post(function(req, res){
     if (req.isAuthenticated())
     req.logout();
     res.send({success: true});
     });

     apiRouter.route('/users/current').get(function (req, res) {
     if (req.isAuthenticated())
     res.send({isAuthenticated: true, user: req.user});
     else res.send({isAuthenticated: false});

     });*/

    console.log(apiRouter);

    apiRouter.route('/users/carts').get(
        auth.shouldAuthenticate,
        function (req, res) {
            console.log('user is auth');
        });

    apiRouter.route('/users/current/carts/add/:id')
        .post(auth.shouldAuthenticate,function (req, res) {
            var id = req.params.id;
            var currentUser = req.user;
            var cart = currentUser.shoppingCart;

            var isExist = Enumerable.from(cart).any(function (c) {
                return c.item.product._id == id;
            });

            if (isExist) {
                var item = Enumerable.from(cart).first(function (c) {
                    return c.item.product._id == id;
                });
                var product = item.item.product;
                product.qty++;

                user.save(function (err) {
                    if (err) {
                        res.code(500).send("Cart not saved");
                        return;
                    }

                    var qty = Enumerable.from(cart).sum(function (c) {
                        return c.item.qty;
                    });

                    res.json({cartQty: qty});
                });
            }
            else {
                Hero.findById(id).exec(function (err, hero) {
                    if (err) {
                        res.code(404).send('Hero not found');
                        return;
                    }

                    cart.push({
                        item: {
                            type: 'hero',
                            product: hero
                        },
                        qty: 1
                    });

                    user.save(function (err) {
                        if (err) {
                            res.code(500).send("Cart not saved");
                            return;
                        }

                        var qty = Enumerable.from(cart).sum(function (c) {
                            return c.item.qty;
                        });

                        res.json({cartQty: qty});
                    });
                });
            }

        });

    return apiRouter;
}

