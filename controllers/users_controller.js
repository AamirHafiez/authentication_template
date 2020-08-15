const User = require('../models/user');
const bcrypt = require('bcrypt');

// render sign up page
module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title: 'Authentication | Sign Up',
        cookies: req.cookies
    });
}

// render sign in page
module.exports.signIn = function(req, res){   
    return res.render('sign_in', {
        title: 'Authentication | Sign In'
    });
}

//render user present
module.exports.userPresent = function(req, res){
    return res.render('user_present', {
        title: 'Authentication | OOPS!'
    });
}

// create user in database (SignUp)
module.exports.create = function(req, res){
    if(req.body.password != req.body.verify_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding user');
            return;
        }
        if(user){
            //TODO: OOPS PAGE USER ALREADY PRESENT 
            return res.redirect('/users/user-present');
        }else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                req.body.password = hash;
                User.create(req.body, function(err, user){
                    if(err){
                        console.log('Error in creating user');
                        return;
                    }
                    return res.redirect('/users/sign-in');
                });    
            });
        }
    });
}

// create session (Sign in)
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

// destro session (Signout)
module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}