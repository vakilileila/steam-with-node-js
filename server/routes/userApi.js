var bodyParser = require('body-parser');
var User = require('../models/user');
var auth = require('../config/auth');

module.exports = function (app, express) {
    var apiRouter = express.Router();

    apiRouter.route('/users')
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

    apiRouter.route('/users/login').post(auth.authenticate);

    apiRouter.route('/users/logout').post(function(req, res){
        if (req.isAuthenticated())
            req.logout();
        res.send({success: true});
    });

    apiRouter.route('/users/current').get(function (req, res) {
        if (req.isAuthenticated())
            res.send({isAuthenticated: true, user: req.user});
        else res.send({isAuthenticated: false});
    });

    return apiRouter;
}

