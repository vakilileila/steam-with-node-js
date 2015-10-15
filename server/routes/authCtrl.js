var passport = require('passport');

module.exports = function (app, express) {
    var apiRouter = express.Router();

    apiRouter.route('/auth/dropbox')
        .get(passport.authenticate('dropbox'));

    apiRouter.route('/auth/dropbox/callback')
        .get(
        passport.authenticate('dropbox', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        });

    apiRouter.route('/auth/dropbox/callback')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });

    return apiRouter;
}