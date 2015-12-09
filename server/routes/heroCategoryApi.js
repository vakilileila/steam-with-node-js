var HeroCategory = require('../models/heroCategory');

module.exports = function (app, express) {
    var apiRouter = express.Router();

    apiRouter.route('/categories')
        .get(function (req, res) {
            var query = req.query;
            var term = '';
            if(query.filter)
                term = query.filter.filters[0].value;

            HeroCategory.find({name: new RegExp(term, "i")})
                .exec(function (err, cats) {
                    if (err) {
                        console.log('Errors ....');
                        res.end('Errors ..');
                        return;
                    }
                    res.json(cats);
                });
        });

    return apiRouter;
}