var HeroCategory = require('../models/heroCategory');
var Rarity = require('../StaticData/RarityData');
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

                    if (!HeroCategory.paginate)
                        consoleSchema.log('Mongose Plugin is Exits ...');
                    HeroCategory.paginate({}, {page: req.query.page, limit: req.query.limit}
                        ,
                        function (err,  pageCount, itemCount) {
                            res.json({
                                data: cats,
                                total: itemCount
                            });
                        })
                });
        });


    apiRouter.route('/combo/categories')
        .get(function (req, res) {
            var query = req.query;
            var term = query.filter.filters[0].value;

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

    apiRouter.route('/admin/rarity')
        .get(function (req, res) {
            var rarity=Rarity.rarity

                    res.json(rarity);

        });



    return apiRouter;
}