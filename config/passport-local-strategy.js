const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user --> PASSPORT');
                return done(err);
            }
            if(!user){
                console.log('Invalid Username');
                return done(null, false);
            }
            bcrypt.compare(password, user.password, function(err, res) {
                if(res) {
                    // Passwords match
                    return done(null, user);
                } else {
                    // Passwords don't match
                    console.log('Invalid Password');
                    return done(null, false);
                } 
            });
        });
    }
));

// serializing user to dedide which key is to be kept in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// desearilizing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> PASSPORT');
            return done(err);
        }
        return done(null, user);
    });
});

//check if user authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

//check if user is not Authenticated
passport.notAuthenticated = function(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

//to set user for the views
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;