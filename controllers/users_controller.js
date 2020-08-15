const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// render sign up page
module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title: 'Authentication | Sign Up',
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

// render forget password page
module.exports.forget = function(req, res){
    res.render('forget_password', {
        title: 'Authentication | Forget'
    });
}

//render change password page
module.exports.changePass = function(req, res){
    res.render('change_password', {
        title: 'Authentication | Change Password', 
        link: req.query
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

// destroy session (Signout)
module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}

// send reset email
module.exports.resetMail = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user --> reset mail');
            return;
        }
        if(!user){
            //TODO: notification user not present
            return res.redirect('back');
        }else{
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    //TODO: Add email and password in user and password field respectively
                    user: 'youremail@gmail.com',
                    pass: 'yourpassword'
                }
            });
            let mailOptions = {
                from: 'youremail@gmail.com',
                to: req.body.email,
                subject: 'Password Reset Link',
                text: 'Hey, Here is your reset link!! Do not share with anyone: http://localhost:8080/users/change-password/?id='+user.id
            };
                
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.redirect('/users/sign-in');
        }
    });
}

// change password sucessfull
module.exports.changePassSucess = function(req, res){
    if(req.body.password != req.body.verify_password){
        return res.redirect('/');
    }
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        User.findByIdAndUpdate(req.query.id, {password: hash}, function(err, user){
            console.log(user.password);
            if(err){
                console.log('error in finding and updating user new password');
                return res.redirect('home');
            }
            return res.redirect('/users/sign-in');
        });
    });
}