const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: 'Your Client Key',
    clientSecret: 'Your Client Secret',
    callbackURL: 'http://localhost:8080/users/auth/google/callback'
}, function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log('Error in google-strategy-passport');
            return;
        }

        if(user){
            return done(null, user);
        }else{

            let p = crypto.randomBytes(20).toString('hex');
            bcrypt.hash(p, 10, function(err, hash){
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: hash
                }, function(err, user){
                    if(err){
                        console.log('Error in google-strategy-passport creating user');
                        return;
                    }
                    return done(null, user);
                });
            })
        }
    });
}));
module.exports = passport;