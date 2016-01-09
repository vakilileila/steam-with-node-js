var passport = require('passport');
var DropboxStrategy = require("passport-dropbox").Strategy;

var User = require('../models/user');

module.exports = {
    configure: function () {
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            User.findById(id).exec(function (err, user) {
                done(null, user);
            });
        });

        passport.use(new DropboxStrategy({
                consumerKey: 'vmdhjw5dulsomka',
                consumerSecret: '3ltjzmlflrp2n2q',
                callbackURL: "http://localhost:3030/auth/dropbox/callback"
            },
            function (token, tokenSecret, profile, done) {
                User.findOne({'dropbox.id': profile.id})
                    .exec(function (err, user) {
                        if (err)
                            return done(err, user);

                        if (user)
                            return done(err, user);

                        var newUser = new User({
                                name: profile.displayName,
                                dropbox: {
                                    id: profile.id,
                                    displayName: profile.displayName,
                                    email: profile.emails[0].value
                                }
                            }
                        );

                        newUser.save(function (err) {
                            if (err)
                                return done(err, null);
                            User.findOne({'dropbox.id': profile.id})
                                .exec(function (err, user) {
                                    return done(err, user);
                                });
                        });

                    });
            }
        ));
    },
    shouldAuthenticate: function (req, res, next) {
        if (req.isAuthenticated())
            next();
        else
            res.send(401, 'not auth');
    }
}
