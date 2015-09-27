var bodyParser = require('body-parser');
var ad = require('../models/ad');

module.exports = function (app, express) {
    var apiRouter = express.Router();

    apiRouter.route('/ads')
        .get(function (req, res) {
            res.render('./ads.ejs', {
                title: 'Ads list'
            });
        });

    return apiRouter;
};