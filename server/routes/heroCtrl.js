
var bodyParser = require('body-parser');
var heroSet = require('../models/heroSet');

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
app.get('/createHero', function (req, res) {
    res.render('./createHero');
});

app.post('/createHero', function (req, res) {
    var newHero = new Hero(req.body);
    newHero.save(function (err) {
        if (err) {
            console.log(err);
            res.end('new hero failed ...');
            return;
        }
        res.end('New Hero added successfully');
    });
});



app.get('/heros', function (req, res) {
    Hero.find().exec(function (err, heros) {
        if (err) {
            console.log(err);
            res.end('Fetching data failed...');
            return;
        }

        res.render('./heros.ejs', {heros: heros} );
    });
});


app.get('/createHero', function (req, res) {
    res.render('./createHero');
});

