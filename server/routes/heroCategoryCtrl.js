var HeroCategory = require('../models/heroCategory');

module.exports = function (app, express) {
    var apiRouter = express.Router();

    apiRouter.route('/admin/heroCategories')
        .get(function (req, res) {
            HeroCategory.find().exec(function (err, cats) {
                res.render('./categoryList.ejs', {categories: cats});
            });
        });

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


    return apiRouter;
}