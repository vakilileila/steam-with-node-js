var bodyParser = require('body-parser');
var category = require('../models/category');

module.exports = function (app, express) {
    var apiRouter = express.Router();

    apiRouter.route('/categories')
        .get(function (req, res) {
            category.find().exec(function (err, categories) {
                res.json({Data: categories});
            });
        })
        .post(function (req, res) {
            var cmd = req.body;

            var newCategory = new category({
                title: cmd.title
            });

            newCategory.save(function (err) {
                if (err) {
                    console.error(err);
                    res.join({success: false});
                }

                res.json({success: true});
            });
        });

    apiRouter.route('/categories/:id')
        .get(function (req, res) {
            var id = res.params.id;

            category.findById(id).exec(function (err, cat) {
                res.json(cat);
            });
        })
        .put(function (req, res) {
            var id = req.params.id;
            var cmd = req.body;

            category.findById(id).exec(function (err, cat) {
                cat.title = cmd.title;

                cat.save(function (err) {
                    if (err) {
                        console.error(err);
                        res.json({success: false});
                    }

                    res.json({success: true});
                })
            })
        })
        .delete(function (req, res) {
            var id = req.params.id;

            category.findById(id).exec(function (err, cat) {
                if (err) {
                    console.error(err);
                    res.json({success: false});
                }

                cat.remove();
                res.json({success: true});
            });
            /*category.find({id: id}).remove().exec(function (err) {
                if (err) {
                    console.error(err);
                    res.json({success: false});
                }

                res.json({success: true});
            });*/
        });

    return apiRouter;
}
