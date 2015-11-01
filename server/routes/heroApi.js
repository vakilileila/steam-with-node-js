var Hero = require('../models/hero');
module.exports = function(app, express){
    var apiRouter = express.Router();

    /*--------- inclusive discount ------*/
    apiRouter.route('/admin/specialItem/addDiscount/:id')

        .get(function(reg,res){
            Hero.findById(reg.params.id)
                .exec(function(err, specilItem){
                    if(err){
                        console.log(err);
                        res.end('update discount error');
                        return;

                    }
                    res.json(specilItem);
                })
        })
        .post( function (req, res) {
            var discountInfo = req.body;
            Hero.findById(req.params.itemId)
                .exec(function (err, specialItem) {
                    if (err) {

                    }
                    specialItem.isOnDiscount = true;
                    specialItem.discount.price = discountInfo.price;
                    specialItem.discount.rate = discountInfo.rate;


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

    return apiRouter;
}